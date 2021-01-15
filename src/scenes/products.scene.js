const Scene = require("telegraf/scenes/base");
const {cleanMessages, sendProducts, getProduct} = require("../helpers");
const _ = require('lodash');

module.exports.productsScene = (bot, I18n) => {
    const productsScene = new Scene("products");

    productsScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await sendProducts(ctx, bot, ctx.session.categoryId);
    });


    productsScene.action('Next', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.productLocationIndex += 1;
        await sendProducts(ctx, bot, ctx.session.categoryId);
    });

    productsScene.action('Previous', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.productLocationIndex -= 1;
        await sendProducts(ctx, bot, ctx.session.categoryId);
    });


    productsScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    productsScene.action('categoriesMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);

        return ctx.scene.enter('subCategoriesEnter');
    });

    productsScene.action(/^aptc:/, async (ctx) => {
        await ctx.answerCbQuery();

        ctx.session.productId = ctx.update.callback_query.data.split(':')[1];


        if (_.findKey(ctx.session.cart, {'id': +ctx.session.productId})) {
            return ctx.scene.enter('products', {
                start: ctx.i18n.t('ProductsInCartExists')
            })
        } else {
            return ctx.scene.enter('productAddToCart');
        }

    });


    return productsScene;
};


module.exports.productAddToCartScene = (bot, I18n) => {
    const productAddToCartScene = new Scene("productAddToCart");

    productAddToCartScene.enter(async (ctx) => {
        try{

        await cleanMessages(ctx);
        // ctx.session.message_filter.push((await ctx.message).message_id);

        const product = await getProduct(ctx.session.productId);


        let qty = ctx.session.registered.language === 'ru' ? 'шт.' : 'ta';
        const lan = ctx.session.registered.language;

        let message = `
🛍️ ${lan === 'ru' ? 'Товар' : 'Tovar'}: ${product[`name_${lan}`]}
📄 ${!_.isEmpty(product[`description_${lan}`]) ?  (`${lan === 'ru' ? 'Описание' : 'Tasnif'}: ${product[`description_${lan}`]}`) : ``}
🏷️ ${lan === 'ru' ? `Цена за штуку` : `Donasining narxi`}: ${product.price} ${lan === 'ru' ? 'сум' : `so'm`}

${ctx.i18n.t("ProductsAddToCart")}`;


        const markupReply = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            [ctx.i18n.t('mainMenuBack'), ctx.i18n.t('CategoriesMenuBack')],
        ]

        let msg;

        if (_.isEmpty(product.photoUrl)) {
            msg = bot.telegram.sendMessage(ctx.chat.id, message, {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: markupReply,
                    resize_keyboard: true
                },
            });
        } else {
            msg = bot.telegram.sendPhoto(ctx.chat.id, `${product.photoUrl}`, {
                parse_mode: "HTML",
                caption: message,
                reply_markup: {
                    keyboard: markupReply,
                    resize_keyboard: true
                },
            });
        }

        ctx.session.message_filter.push((await msg).message_id);
        } catch (e) {
            console.error(e.message);
            return ctx.scene.enter("mainMenu", {
                start: ctx.i18n.t("mainErrorMessage"),
            });
        }
    });


    productAddToCartScene.hears(I18n.match('mainMenuBack'), async (ctx) => {

        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    productAddToCartScene.hears(I18n.match('CategoriesMenuBack'), async (ctx) => {

        return ctx.scene.enter('categoriesEnter');
    });

    productAddToCartScene.on('text', async (ctx) => {
        if (ctx.message.text.match(/^[0-9]*$/)) {
            const quantity = ctx.message.text;
            const product = await getProduct(ctx.session.productId);
            ctx.session.cart[`${product.id}`] = {
                id: product.id,
                name_ru: product.name_ru,
                name_uz: product.name_uz,
                price: product.price,
                quantity: quantity,
                item_total_price: !_.isEmpty(product.discount) ? ((product.price - (product.price * (product.discount / 100))) * quantity) : product.price * quantity,
                discount: product.discount,
            }

            return ctx.scene.enter('products', {
                start: ctx.i18n.t('ProductsAddedToCartSucces')
            })

        } else {
            const msg = ctx.reply(ctx.i18n.t('ProductsAddToCartErrMessage'));

            ctx.session.message_filter.push((await msg).message_id);
        }
        // await sendSubCategories(ctx, bot, parentId);
    });

    // productAddToCartScene.action(/^aptc:/, async (ctx) => {
    //     await ctx.answerCbQuery();
    //
    //     const productId = ctx.update.callback_query.data.split(':')[1];
    //
    //
    //
    //     // await sendSubCategories(ctx, bot, parentId);
    // });


    return productAddToCartScene;
};
