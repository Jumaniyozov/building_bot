const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const {cleanMessages, sendLocations} = require("../helpers");


module.exports = (bot, I18n) => {
    const locationsScene = new Scene("locations");

    locationsScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);

        let message = ctx.i18n.t("mainMenuLocations");

        ctx.session.locationsMenuMarkup = [
            [`${ctx.i18n.t("LocationsMenuBuy")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ];

        ctx.session.currentLocationIndex = 0;

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: ctx.session.locationsMenuMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });

    locationsScene.hears(I18n.match("LocationsMenuBuy"), async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.message_filter.push((await ctx.message).message_id);


        await sendLocations(ctx, bot);
    });

    locationsScene.action('Next', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.currentLocationIndex += 1;
        await sendLocations(ctx, bot);
    });

    locationsScene.action('Previous', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.currentLocationIndex -= 1;
        await sendLocations(ctx, bot);
    });

    locationsScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    locationsScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    return locationsScene;
};
