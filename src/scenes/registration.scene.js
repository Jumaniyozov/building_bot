const Scene = require('telegraf/scenes/base');
const _ = require('lodash');
const {User} = require("../models");


module.exports.registrationGetScene = (bot, I18n) => {
    const registrationScene = new Scene('registrationGet');

    registrationScene.enter(async ctx => {
        if (!_.isEmpty(ctx.session.registered)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('mainMenu')
            })
        }

        ctx.session.userDetails.phoneNumber = '';

        const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('RegistrationMenu'), {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    [{
                        text: `${ctx.i18n.t('RegistrationMenuVerify')}`, request_contact: true
                    }],
                    [`${ctx.i18n.t('LanguangeMenuBack')}`]
                ],
                resize_keyboard: true
            }
        })

        ctx.session.message_filter.push((await msg).message_id);
    });


    registrationScene.hears(I18n.match('LanguangeMenuBack'), async (ctx) => {
        return ctx.scene.enter('language');
    })

    registrationScene.hears(I18n.match('RegistrationMenuBack'), async (ctx) => {
        return ctx.scene.enter('registrationGet');
    })

    registrationScene.on('contact', async (ctx) => {

        ctx.session.userDetails.phoneNumber = ctx.message.contact.phone_number;

        const verifyMessage = ctx.i18n.t('RegistrationMenuVerifyContact', {
            phone_number: ctx.session.userDetails.phoneNumber
        })

        const msg = bot.telegram.sendMessage(ctx.chat.id, verifyMessage, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    [`${ctx.i18n.t('RegistrationMenuVerifyContactPhone')}`],
                    [`${ctx.i18n.t('RegistrationMenuBack')}`],
                ],
                resize_keyboard: true
            }
        })

        ctx.session.message_filter.push((await msg).message_id);
    })

    registrationScene.hears(/\+998\d{9}$/, async ctx => {
        ctx.session.userDetails.phoneNumber = ctx.message.text;

        const verifyMessage = ctx.i18n.t('RegistrationMenuVerifyContact', {
            phone_number: ctx.session.userDetails.phoneNumber
        })

        const msg = bot.telegram.sendMessage(ctx.chat.id, verifyMessage, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: [
                    [`${ctx.i18n.t('RegistrationMenuVerifyContactPhone')}`],
                    [`${ctx.i18n.t('RegistrationMenuBack')}`],
                ],
                resize_keyboard: true
            }
        })

        ctx.session.message_filter.push((await msg).message_id);
    })

    registrationScene.hears(I18n.match('RegistrationMenuVerifyContactPhone'), async (ctx) => {

        if (!_.isEmpty(ctx.session.userDetails.phoneNumber)) {
            ctx.scene.enter('registrationVerify');
        } else {
            return ctx.scene.enter('registrationGet');
        }
    })


    return registrationScene;
}


module.exports.registrationVerifyScene = (bot, I18n) => {
    const registrationVerifyScene = new Scene('registrationVerify');

    registrationVerifyScene.enter(async ctx => {
        // if (!_.isEmpty(ctx.session.registered)) {
        //     return ctx.scene.enter('mainMenu', {
        //         start: ctx.i18n.t('mainMenu')
        //     })
        // }
        //
        // const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('RegistrationMenuSMS'), {
        //     parse_mode: 'HTML',
        //     reply_markup: {
        //         keyboard: [
        //             [`${ctx.i18n.t('RegistrationMenuBack')}`]
        //         ],
        //         resize_keyboard: true
        //     }
        // })
        //
        // ctx.session.message_filter.push((await msg).message_id);

        let user = {};
        try {
            user = await User.create({
                username: ctx.from.username,
                userId: ctx.from.id,
                phone: ctx.session.userDetails.phoneNumber,
                language: ctx.session.userDetails.language
            });

        } catch (error) {
            console.error(error.message);
            if (error.name === 'SequelizeUniqueConstraintError') {
                ctx.session.registered = {
                    user: {
                        id: ctx.from.id,
                        phone: ctx.session.userDetails.phoneNumber,
                        language: ctx.session.userDetails.language
                    }
                };
                return ctx.scene.enter('mainMenu', {
                    start: ctx.i18n.t('successfulRegistration', {name: ctx.from.username})
                })
            }
            return ctx.scene.enter('registrationGet')
        }

        ctx.session.registered = {user};
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('successfulRegistration', {name: ctx.from.username})
        })
    });

    //
    // registrationVerifyScene.hears(I18n.match('LanguangeMenuBack'), async (ctx) => {
    //     return ctx.scene.enter('language');
    // })
    //
    // registrationVerifyScene.hears(I18n.match('RegistrationMenuBack'), async (ctx) => {
    //     return ctx.scene.enter('registrationGet');
    // })
    //
    // registrationVerifyScene.on('text', async ctx => {
    //     if (ctx.message.text === 'qwerty') {
    //         let user = {};
    //         try {
    //             user = await User.create({
    //                 username: ctx.from.username,
    //                 userId: ctx.from.id,
    //                 phone: ctx.session.userDetails.phoneNumber,
    //                 language: ctx.session.userDetails.language
    //             });
    //         } catch (error) {
    //             if (error.name === 'SequelizeUniqueConstraintError') {
    //                 ctx.session.registered = {
    //                     user: {
    //                         id: ctx.from.id,
    //                         phone: ctx.session.userDetails.phoneNumber,
    //                         language: ctx.session.userDetails.language
    //                     }
    //                 };
    //                 return ctx.scene.enter('mainMenu', {
    //                     start: ctx.i18n.t('successfulRegistration', {name: ctx.from.username})
    //                 })
    //             }
    //             return ctx.scene.enter('registrationGet')
    //         }
    //         ctx.session.registered = {user};
    //         return ctx.scene.enter('mainMenu', {
    //             start: ctx.i18n.t('successfulRegistration', {name: ctx.from.username})
    //         })
    //     } else {
    //         ctx.reply(`${ctx.i18n.t('unsuccessfulMessage')}`)
    //     }
    //
    // })

    return registrationVerifyScene;
}
