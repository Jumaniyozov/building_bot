const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const {cleanMessages, sendLocations} = require("../helpers");


module.exports = (bot, I18n) => {
    const searchScene = new Scene("search");

    searchScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);

        // let message = ctx.i18n.t("mainMenuLocations");

        let replyMarkup = [
            [{
                text: `${ctx.i18n.t("mainMenuSearch")}`,
                switch_inline_query_current_chat: ''
            }],
        ];

        let replyMarkupe = [[`${ctx.i18n.t("mainMenuBack")}`]];

        ctx.session.currentLocationIndex = 0;


        const msge = bot.telegram.sendMessage(ctx.chat.id, `${ctx.i18n.t("SearchMenuMsg")}`, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkupe,
                resize_keyboard: true
            },
        });
        ctx.session.message_filter.push((await msge).message_id);

        const msg = bot.telegram.sendMessage(ctx.chat.id, `${ctx.i18n.t("mainMenuSearch")}`, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: replyMarkup,
                resize_keyboard: true
            },
        });
        ctx.session.message_filter.push((await msg).message_id);

    });

    searchScene.hears(I18n.match(`mainMenuBack`), async (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    searchScene.action(/atcifs:/, async (ctx) => {
        await ctx.answerCbQuery();
        ctx.session.productId = ctx.update.callback_query.data.split(":")[1];
        return ctx.scene.enter('productAddToCart');
    });

    searchScene.action(/rtcifs:/, async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
    });

    return searchScene;
};
