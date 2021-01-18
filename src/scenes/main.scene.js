const Scene = require('telegraf/scenes/base');
const {cleanMessages, messageFilter} = require('../helpers');


module.exports = (bot, I18n) => {
    const mainScene = new Scene('mainMenu');


    mainScene.enter(async (ctx) => {
        await cleanMessages(ctx);

        let message = ctx.i18n.t('greeting', {
            ctx: ctx
        })

        ctx.session.actionIndex = 0;
        ctx.session.currentLocationIndex = 0;
        ctx.session.currentCategoryLocationIndex = 0;
        ctx.session.order = {};

        const authMsg = [

            [`${ctx.i18n.t('mainMenuCategories')}`, {
                text: `${ctx.i18n.t("mainMenuSearch")}`,
                switch_inline_query_current_chat: '@adfasfsfafdfds'
            }],
            [`${ctx.i18n.t('mainMenuDiscounts')}`, `${ctx.i18n.t('mainMenuLocations')}`],
            [`${ctx.i18n.t('mainMenuOrders')}`, `${ctx.i18n.t('mainMenuCart')}`],
            [`${ctx.i18n.t('mainMenuContacts')}`, `${ctx.i18n.t('mainMenuSettings')}`],
            [`${ctx.i18n.t('mainMenuQA')}`],
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

        await messageFilter(ctx, msg);
    })


    mainScene.hears(I18n.match('mainMenuContacts'), ctx => {
        return ctx.scene.enter('contacts')
    })

    mainScene.hears(I18n.match('mainMenuSearch'), ctx => {
        return ctx.scene.enter('search')
    })

    mainScene.hears(I18n.match('mainMenuDiscounts'), ctx => {
        return ctx.scene.enter('actions')
    })

    mainScene.hears(I18n.match('mainMenuSettings'), ctx => {
        return ctx.scene.enter('settingsMenu')
    })

    mainScene.hears(I18n.match('mainMenuLocations'), ctx => {
        return ctx.scene.enter('locations');
    })

    mainScene.hears(I18n.match('mainMenuCategories'), ctx => {
        return ctx.scene.enter('categoriesEnter');
    })

    mainScene.hears(I18n.match('mainMenuOrders'), ctx => {
        return ctx.scene.enter('myOrdersPending');
    })

    mainScene.hears(I18n.match('mainMenuCart'), ctx => {
        return ctx.scene.enter('cartEnter');
    })

    mainScene.hears(I18n.match('mainMenuQA'), ctx => {
        return ctx.scene.enter('askQuestion');
    })

    mainScene.hears(I18n.match('mainMenuBack'), ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    return mainScene;
}
