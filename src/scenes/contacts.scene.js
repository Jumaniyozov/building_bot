const Scene = require("telegraf/scenes/base");
const {getContacts, cleanMessages} = require("../helpers");
const _ = require('lodash');

module.exports = (bot, I18n) => {
    const contactScene = new Scene("contacts");


    contactScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);

        ctx.session.contactsMenuMarkup = [
            [
                `${ctx.i18n.t("contactsMenuNumbers")}`,
                `${ctx.i18n.t("contactsMenuSocials")}`,
            ],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ];

        let message = `${ctx.i18n.t("mainMenuContacts")}`;

        if (ctx.scene.state.start) {
            message = ctx.scene.state.start;
        }

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: ctx.session.contactsMenuMarkup,
                resize_keyboard: true,
                // one_time_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });

    // listener
    contactScene.hears(I18n.match("contactsMenuNumbers"), async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);

        let message = await getContacts();

        if (_.isEmpty(message)) {
            const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('contactsMenuSocialsEmpty'), {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: ctx.session.contactsMenuMarkup,
                    resize_keyboard: true,
                },
            });
        } else {
            const msg = bot.telegram.sendMessage(ctx.chat.id, message.phoneNumbers, {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: ctx.session.contactsMenuMarkup,
                    resize_keyboard: true,
                },
            });

            ctx.session.message_filter.push((await msg).message_id);
        }
    });

// listener
    contactScene.hears(I18n.match("contactsMenuSocials"), async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);

        let message = await getContacts();

        if (_.isEmpty(message)) {
            const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('contactsMenuSocialsEmpty'), {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: ctx.session.contactsMenuMarkup,
                    resize_keyboard: true,
                },
            });
        } else {
            const msg = bot.telegram.sendMessage(ctx.chat.id, message.socials, {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: ctx.session.contactsMenuMarkup,
                    resize_keyboard: true,
                },
            });
            ctx.session.message_filter.push((await msg).message_id);
        }


    });

// listener
    contactScene.hears(I18n.match("mainMenuBack"), async (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    return contactScene;
};
