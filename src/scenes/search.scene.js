const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const {cleanMessages, messageFilter} = require("../helpers");


module.exports = (bot, I18n) => {
    const searchScene = new Scene("search");

    searchScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await messageFilter(ctx, ctx.message);

        let replyMarkupInline = [
            [{
                text: `${ctx.i18n.t("mainMenuSearch")}`,
                switch_inline_query_current_chat: ''
            }],
        ];

        let replyMarkup = [[`${ctx.i18n.t("mainMenuBack")}`]];

        ctx.session.currentLocationIndex = 0;


        let message = `${ctx.i18n.t("SearchMenuMsg")}`;

        if (ctx.scene.state.start) {
            message = ctx.scene.state.start
        }

        const msge = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            },
        });
        await messageFilter(ctx, msge);

        const msg = bot.telegram.sendMessage(ctx.chat.id, `${ctx.i18n.t("mainMenuSearch")}`, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: replyMarkupInline,
                resize_keyboard: true
            },
        });
        await messageFilter(ctx, msg);
    });

    searchScene.hears(I18n.match(`mainMenuBack`), async (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    searchScene.action(/atcifs:/, async (ctx) => {
        await ctx.answerCbQuery();
        ctx.session.productId = ctx.update.callback_query.data.split(":")[1];
        ctx.session.searchProduct = true;
        return ctx.scene.enter('productAddToCart');
    });

    searchScene.action(/rtcifs:/, async (ctx) => {
        await ctx.answerCbQuery();
        await ctx.deleteMessage(ctx.update.callback_query.message.message_id);
    });

    return searchScene;
};
