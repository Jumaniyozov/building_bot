const Scene = require('telegraf/scenes/base');
const {cleanMessages} = require('../helpers');
const _ = require('lodash');
const {messageFilter} = require("../helpers");
const {sendCart} = require("../helpers");


module.exports.cartEnterScene = (bot, I18n) => {
    const cartEnterScene = new Scene('cartEnter');


    cartEnterScene.enter(async (ctx) => {
        await cleanMessages(ctx);

        if (_.isEmpty(ctx.session.cart)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('CartMenuEmpty')
            })
        }

        ctx.session.cartItemIndex = 0;

        await sendCart(ctx, bot);
    })



    cartEnterScene.hears(I18n.match('CartMenuClear'), ctx => {
        for (const prop of Object.getOwnPropertyNames(ctx.session.cart)) {
            delete ctx.session.cart[prop];
        }

        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('CartMenuClearSuccess')
        })
    })

    cartEnterScene.hears(I18n.match('mainMenuBack'), ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })


    cartEnterScene.action('makeOrder', async ctx => {

        return ctx.scene.enter('orderEnterFIO');
    })


    cartEnterScene.action('Next', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.cartItemIndex += 1;
        await sendCart(ctx, bot);
    });

    cartEnterScene.action('Previous', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.cartItemIndex -= 1;
        await sendCart(ctx, bot);
    });

    cartEnterScene.action(/cid:/, async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        const idToDel = ctx.update.callback_query.data.split(':')[1];
        let qty = ctx.session.registered.language === 'ru' ? 'шт.' : 'ta';
        const lan = ctx.session.registered.language;
        const product = ctx.session.cart[idToDel];


        const msg = await ctx.reply(`
${lan === 'ru' ? 'Товар' : 'Tovar'}: ${product[`name_${lan}`]}
${lan === 'ru' ? 'Количество' : 'Miqdori'}: ${product.quantity} ${qty}
${lan === 'ru' ? `Цена за штуку` : `Donasining narxi`}: ${product.price} ${product.discount === 0 ? '' : `(${product.discount}%)`} ${lan === 'ru' ? 'сум' : `so'm`}`)

        await messageFilter(ctx, msg)

        await sendCart(ctx, bot);
    });

    cartEnterScene.action(/cmi:/, async (ctx) => {
        await ctx.answerCbQuery();
        const idToDel = ctx.update.callback_query.data.split(':')[1];

        ctx.session.cart[idToDel].quantity = +ctx.session.cart[idToDel].quantity - 1;

        if (ctx.session.cart[idToDel].quantity <= 0) {
            delete ctx.session.cart[idToDel];
        }
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    });


    cartEnterScene.action(/cai:/, async (ctx) => {
        await ctx.answerCbQuery();
        const idToDel = ctx.update.callback_query.data.split(':')[1];
        // const key = _.findKey(ctx.session.cart, {'id': +idToDel});
        ctx.session.cart[idToDel].quantity = +ctx.session.cart[idToDel].quantity + 1;
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    });


    cartEnterScene.action(/cri:/, async (ctx) => {
        await ctx.answerCbQuery();
        const idToDel = ctx.update.callback_query.data.split(':')[1];
        // const key = _.findKey(ctx.session.cart, {'id': +idToDel});
        delete ctx.session.cart[idToDel];
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    });


    cartEnterScene.action('cartMenuBack', ctx => {
        return ctx.scene.enter('cartEnter');
    })

    cartEnterScene.action('mainMenuBack', ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('CartMenuClearSuccess')
        })
    })

    return cartEnterScene;
}

