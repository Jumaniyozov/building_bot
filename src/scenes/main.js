const Scene = require('telegraf/scenes/base');
const cleanMessages = require('../helpers/cleaner');


module.exports = (bot, I18n) => {
    const mainScene = new Scene('mainMenu');


    mainScene.enter(async (ctx) => {
        cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);

        let message = ctx.i18n.t('greeting', {
            ctx: ctx
        })

        const authMsg = [
            [`${ctx.i18n.t('mainMenuOrders')}`, `${ctx.i18n.t('mainMenuSearch')}`],
            [`${ctx.i18n.t('mainMenuDiscounts')}`, `${ctx.i18n.t('mainMenuCategories')}`],
            [`${ctx.i18n.t('mainMenuContacts')}`, `${ctx.i18n.t('mainMenuCart')}`],
            [`${ctx.i18n.t('mainMenuLocations')}`],
        ]
        
        if (ctx.scene.state.start) {
            message = ctx.scene.state.start
        }

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: authMsg,
                resize_keyboard: true,
                // one_time_keyboard: true
            }
        })

        ctx.session.message_filter.push((await msg).message_id);
    })


    mainScene.hears(I18n.match('mainMenuContacts'), ctx => {
       return ctx.scene.enter('contacts')
    })

    mainScene.hears(I18n.match('mainMenuLocations'), ctx => {
       return ctx.scene.enter('locations');
    })

    mainScene.hears(I18n.match('mainMenuBack'), ctx => {
       return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    return mainScene;
}
