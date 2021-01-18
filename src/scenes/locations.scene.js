const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const {cleanMessages, sendLocations, messageFilter} = require("../helpers");


module.exports = (bot, I18n) => {
    const locationsScene = new Scene("locations");

    locationsScene.enter(async (ctx) => {
        await cleanMessages(ctx);

        await sendLocations(ctx, bot);
    });

    locationsScene.action('Next', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.currentLocationIndex += 1;
        await sendLocations(ctx, bot);
    });


    locationsScene.action(/gtd:/, async (ctx) => {
        await ctx.answerCbQuery();

        let lan = ctx.session.registered.language

        const msg =  ctx.reply(`
${lan === 'ru' ? 'Имя' : 'Nomi'}: ${ctx.session.currentLocation[`name_${lan}`]}
${lan === 'ru' ? 'Адресс' : 'Manzil'}: ${ctx.session.currentLocation[`description_${lan}`]}
`)

        await messageFilter(ctx, msg);
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

    return locationsScene;
};
