const Scene = require('telegraf/scenes/base');
const {cleanMessages} = require('../helpers');
const _ = require('lodash');
const {getCartList} = require("../helpers");
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

        let message = ctx.i18n.t('mainMenuCart');

        const authMsg = [
            [`${ctx.i18n.t('CartMenuSee')}`],
            [`${ctx.i18n.t('CartMenuClear')}`],
            [`${ctx.i18n.t('mainMenuBack')}`],
        ]

        if (ctx.scene.state.start) {
            message = ctx.scene.state.start
        }

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: authMsg,
                resize_keyboard: true
            }
        })

        ctx.session.message_filter.push((await msg).message_id);
    })



    cartEnterScene.hears(I18n.match('CartMenuClear'), ctx => {
        for (const prop of Object.getOwnPropertyNames(ctx.session.cart)) {
            delete ctx.session.cart[prop];
        }

        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('CartMenuClearSuccess')
        })
    })


    cartEnterScene.hears(I18n.match('CartMenuSee'), async ctx => {
        ctx.scene.enter('cartMenuEnter');
    })


    cartEnterScene.hears(I18n.match('mainMenuBack'), ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    return cartEnterScene;
}


module.exports.cartMenuEnterScene = (bot, I18n) => {
    const cartMenuEnterScene = new Scene('cartMenuEnter');


    cartMenuEnterScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    })



    cartMenuEnterScene.action('CartMenuSee', async ctx => {
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    })


    cartMenuEnterScene.action('makeOrder', async ctx => {
        // await cleanMessages(ctx);
        return ctx.scene.enter('orderEnter');
    })


    cartMenuEnterScene.action('Next', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.cartItemIndex += 1;
        await sendCart(ctx, bot);
    });

    cartMenuEnterScene.action('Previous', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.cartItemIndex -= 1;
        await sendCart(ctx, bot);
    });

    cartMenuEnterScene.action('showList', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);

        const message = await getCartList(ctx);

        const msg = await bot.telegram.sendMessage(
            ctx.chat.id,
            message,
            {
                parse_mode: "HTML",
                reply_markup: {
                    // resize_keyboard: true,
                    inline_keyboard: [
                        [{
                            text: `${ctx.i18n.t('CartMenuBack')}`,
                            callback_data: `CartMenuSee`
                        }],
                        [{
                            text: `${ctx.i18n.t('mainMenuBack')}`,
                            callback_data: `mainMenuBack`
                        }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                },
            }
        );

        ctx.session.message_filter.push((await msg).message_id);
    });

    cartMenuEnterScene.action(/cid:/, async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        const idToDel = ctx.update.callback_query.data.split(':')[1];
        let qty = ctx.session.registered.language === 'ru' ? 'шт.' : 'ta';
        const lan = ctx.session.registered.language;
        const product = ctx.session.cart[idToDel];


        const msg = await ctx.reply(`
${lan === 'ru' ? 'Товар' : 'Tovar'}: ${product[`name_${lan}`]}
${lan === 'ru' ? 'Количество' : 'Miqdori'}: ${product.quantity} ${qty}
${lan === 'ru' ? `Цена за штуку` : `Donasining narxi`}: ${product.price} ${lan === 'ru' ? 'сум' : `so'm`}`)

        ctx.session.message_filter.push((await msg).message_id);

        await sendCart(ctx, bot);
    });

    cartMenuEnterScene.action(/cmi:/, async (ctx) => {
        await ctx.answerCbQuery();
        const idToDel = ctx.update.callback_query.data.split(':')[1];

        ctx.session.cart[idToDel].quantity = +ctx.session.cart[idToDel].quantity - 1;

        if (ctx.session.cart[idToDel].quantity <= 0) {
            delete ctx.session.cart[idToDel];
        }
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    });


    cartMenuEnterScene.action(/cai:/, async (ctx) => {
        await ctx.answerCbQuery();
        const idToDel = ctx.update.callback_query.data.split(':')[1];
        // const key = _.findKey(ctx.session.cart, {'id': +idToDel});
        ctx.session.cart[idToDel].quantity = +ctx.session.cart[idToDel].quantity + 1;
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    });


    cartMenuEnterScene.action(/cri:/, async (ctx) => {
        await ctx.answerCbQuery();
        const idToDel = ctx.update.callback_query.data.split(':')[1];
        // const key = _.findKey(ctx.session.cart, {'id': +idToDel});
        delete ctx.session.cart[idToDel];
        await cleanMessages(ctx);
        await sendCart(ctx, bot);
    });


    cartMenuEnterScene.action('cartMenuBack', ctx => {
        return ctx.scene.enter('cartEnter');
    })

    cartMenuEnterScene.action('mainMenuBack', ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('CartMenuClearSuccess')
        })
    })

    return cartMenuEnterScene;

}
