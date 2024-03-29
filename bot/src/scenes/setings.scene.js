const Scene = require('telegraf/scenes/base');
const _ = require('lodash');
const {cleanMessages, messageFilter} = require("../helpers");
const {User} = require("../models");


module.exports.settingsEnterScene = (bot, I18n) => {
    const settingsEnterScene = new Scene('settingsMenu');

    settingsEnterScene.enter(async ctx => {
        await cleanMessages(ctx);

        const replyMarkup = [
            [ctx.i18n.t('SettingsMenuChangePhone')],
            [ctx.i18n.t('SettingsMenuChangeLanguage')],
            [ctx.i18n.t('SettingsMenuChangeName')],
            [ctx.i18n.t('mainMenuBack')]
        ]

        let message = ctx.i18n.t('mainMenuSettings');

        if (ctx.scene.state.start) {
            message = ctx.scene.state.start
        }

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            }
        })

        await messageFilter(ctx, msg);
    });

    settingsEnterScene.hears(I18n.match('mainMenuBack'), ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    settingsEnterScene.hears(I18n.match('SettingsMenuChangePhone'), ctx => {

        return ctx.scene.enter('settingsChangePhone');
    })

    settingsEnterScene.hears(I18n.match('SettingsMenuChangeName'), ctx => {

        return ctx.scene.enter('settingsChangeName');
    })

    settingsEnterScene.hears(I18n.match('SettingsMenuChangeLanguage'), ctx => {
        ctx.session.changingLanguage = {item: 'not empty'};
        return ctx.scene.enter('language')
    })

    return settingsEnterScene;
}


module.exports.settingsChangePhoneScene = (bot, I18n) => {
    const settingsChangePhoneScene = new Scene('settingsChangePhone');

    settingsChangePhoneScene.enter(async ctx => {
        await cleanMessages(ctx);

        const replyMarkup = [
            [ctx.i18n.t('SettingsMenuBack')],
            [ctx.i18n.t('mainMenuBack')]
        ]

        const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('SettingsMenuChangePhoneMsg'), {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            }
        })

        await messageFilter(ctx, msg);
    });

    settingsChangePhoneScene.hears(I18n.match('mainMenuBack'), ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    settingsChangePhoneScene.hears(I18n.match('SettingsMenuBack'), ctx => {
        return ctx.scene.enter('settingsMenu')
    })


    settingsChangePhoneScene.on('text', async ctx => {

        if (ctx.message.text.match(/\+998\d{9}$/)) {

            await User.update({phone: ctx.message.text}, {where: {userId: ctx.from.id}})
                .catch(error => console.error(error.message));

            ctx.session.registered.phone = ctx.message.text;

            return ctx.scene.enter('settingsMenu', {
                start: ctx.i18n.t('SettingsMenuChangePhoneSuccess')
            })
        } else {
            return ctx.scene.enter('settingsChangePhone');
        }


    })

    return settingsChangePhoneScene;
}

module.exports.settingsChangeNameScene = (bot, I18n) => {
    const settingsChangeNameScene = new Scene('settingsChangeName');

    settingsChangeNameScene.enter(async ctx => {
        await cleanMessages(ctx);

        const replyMarkup = [
            [ctx.i18n.t('SettingsMenuBack')],
            [ctx.i18n.t('mainMenuBack')]
        ]

        const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('SettingsMenuChangeNameMsg'), {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            }
        })

        await messageFilter(ctx, msg);
    });

    settingsChangeNameScene.hears(I18n.match('mainMenuBack'), ctx => {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    settingsChangeNameScene.hears(I18n.match('SettingsMenuBack'), ctx => {
        return ctx.scene.enter('settingsMenu')
    })


    settingsChangeNameScene.on('text', async ctx => {

        ctx.session.FIO = ctx.message.text;

        return ctx.scene.enter('settingsMenu', {
            start: ctx.i18n.t('SettingsMenuChangeNameSuccess')
        })

    })

    return settingsChangeNameScene;
}
