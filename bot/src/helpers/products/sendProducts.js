const getProducts = require("./getProducts");
const _ = require('lodash');
const cleanMessages = require('../cleaner');


const sendProducts = async (ctx, bot, parentId) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'typing');

    const {productLocationIndex} = ctx.session;

    try {

        const listLength = 10;

        const categories = await getProducts(parentId);

        if (_.isEmpty(categories)) {
            try {
                ctx.session.message_filter.push(await ctx.reply(ctx.i18n.t('SubCategoriesMenuEmpty')).message_id);
            } catch (e) {
                console.error(e.message);
            }

            return ctx.scene.enter('subCategoriesEnter');
        } else {
            // await cleanMessages(ctx);


            const categoryLength = categories.length / listLength;

            const list = categories
                .slice(productLocationIndex === 0 ? 0 : productLocationIndex * listLength,
                    productLocationIndex === 0 ? listLength : (productLocationIndex + 1) * listLength);

            const categoryMarkup = list.map(el => {
                return [{
                    text: `${el[`name_${ctx.session.registered.language}`]}`,
                    callback_data: `aptc:${el.id}`
                }]
            })

            const backMenu = [[{
                text: `${ctx.i18n.t('CategoriesMenuBack')}`,
                callback_data: `categoriesMenuBack`
            }],
                [{
                    text: `${ctx.i18n.t('mainMenuBack')}`,
                    callback_data: `mainMenuBack`
                }]];

            const nextMenu = [{text: '▶️', callback_data: 'Next'}];

            const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];
            const previousMenu = [{text: '◀️', callback_data: 'Previous'}]

            const menu1 = [
                ...categoryMarkup,
                nextMenu,
                ...backMenu
            ]

            const menu2 = [
                ...categoryMarkup,
                nextAndPreviousMenu,
                ...backMenu
            ]

            const menu3 = [
                ...categoryMarkup,
                previousMenu,
                ...backMenu
            ]

            const menu4 = [
                ...categoryMarkup,
                ...backMenu
            ]

            let markupReply = [];

            if (productLocationIndex === 0) {
                if (productLocationIndex + 1 < categoryLength) {
                    markupReply = menu1;
                } else {
                    markupReply = menu4;
                }
            } else {
                if (productLocationIndex + 1 < categoryLength) {
                    markupReply = menu2;
                } else {
                    markupReply = menu3;
                }
            }

            let message = ctx.i18n.t('mainMenuCategories');

            if (ctx.scene.state.start) {
                message = ctx.scene.state.start
            }


            if (!_.isEmpty(categoryMarkup)) {
                const msg = await bot.telegram.sendMessage(
                    ctx.chat.id,
                    message,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            // resize_keyboard: true,
                            inline_keyboard: markupReply,
                            one_time_keyboard: true
                        },
                    }
                );
                ctx.session.message_filter.push((await msg).message_id);
            } else {
                const msg = bot.telegram.sendMessage(
                    ctx.chat.id,
                    `${ctx.i18n.t("CategoriesMenuEmpty")}`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            keyboard: ctx.session.categoriesMenuMarkup,
                            resize_keyboard: true,
                        },
                    }
                );
                await messageFilter(ctx, m)
                ctx.session.message_filter.push((await msg).message_id);
            }
        }
    } catch (error) {
        console.error(error);
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainErrorMessage')
        })
    }
};

module.exports = sendProducts;
