const Scene = require("telegraf/scenes/base");
const {cleanMessages} = require("../helpers");
const _ = require('lodash');
const {sendMyOrders} = require("../helpers");

module.exports.myOrdersPendingScene = (bot, I18n) => {
    const myOrdersPendingScene = new Scene("myOrdersPending");


    myOrdersPendingScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await sendMyOrders(ctx, bot);
    });


    myOrdersPendingScene.action('Next', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.myOrdersIndex += 1;
        await sendMyOrders(ctx, bot);
    });

    myOrdersPendingScene.action('Previous', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.myOrdersIndex -= 1;
        await sendMyOrders(ctx, bot);
    });

    myOrdersPendingScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });


    return myOrdersPendingScene;
};

