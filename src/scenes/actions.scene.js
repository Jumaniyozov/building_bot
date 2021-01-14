const Scene = require("telegraf/scenes/base");
const {sendActions, cleanMessages} = require("../helpers");

module.exports.actionsScene = (bot, I18n) => {
    const actionsScene = new Scene("actions");


    actionsScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await sendActions(ctx, bot);
    });

    actionsScene.action('Next', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.actionIndex += 1;
        await sendActions(ctx, bot);
    });

    actionsScene.action('Previous', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.actionIndex -= 1;
        await sendActions(ctx, bot);
    });

    actionsScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });



    return actionsScene;
};

