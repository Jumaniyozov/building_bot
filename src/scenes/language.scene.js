const Scene = require('telegraf/scenes/base');
const _ = require('lodash');
const {cleanMessages} = require("../helpers");


module.exports = (bot, I18n) => {
    const languageScene = new Scene('language');

    languageScene.enter(async ctx => {

        if (!_.isEmpty(ctx.session.registered)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('mainMenu')
            })
        }

        ctx.session.userDetails = {};

        const langMarkup = [
            [`🇷🇺 Русский`],
            [`🇺🇿 O'zbekcha`]
        ]

        const introMessage = `
🇷🇺 Пожалуйста выберите свой язык
🇺🇿 Iltimos o'z tilingizni tanlang
`

        if (!_.isEmpty(ctx.session.registered)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('mainMenu')
            })
        } else {
            const msg = bot.telegram.sendMessage(ctx.chat.id, introMessage, {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: langMarkup,
                    resize_keyboard: true
                }
            })

            ctx.session.message_filter.push((await msg).message_id);
        }
    });

    languageScene.on('text', async (ctx) => {
        await cleanMessages(ctx)
        ctx.session.message_filter.push((await ctx.message).message_id);

        if (!_.isEmpty(ctx.session.registered)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('mainMenu')
            })
        } else {
            if (ctx.message.text === `🇷🇺 Русский`) {
                ctx.i18n.locale('ru');
                ctx.session.userDetails.language = 'ru';
               return  ctx.scene.enter('registrationGet');
            } else if (ctx.message.text === `🇺🇿 O'zbekcha`) {
                ctx.i18n.locale('uz');
                ctx.session.userDetails.language = 'uz';
              return  ctx.scene.enter('registrationGet');
            } else {
                return ctx.scene.enter('language');
            }
        }


    })

    return languageScene;
}
