const Scene = require("telegraf/scenes/base");
const {cleanMessages} = require("../helpers");
const _ = require('lodash');
const {sendMyOrders} = require("../helpers");

module.exports.myOrdersEnterScene = (bot, I18n) => {
    const myOrdersEnterScene = new Scene("myOrders");


    myOrdersEnterScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        // ctx.session.message_filter.push((await ctx.message).message_id);

        ctx.session.myOrdersIndex = 0;

        ctx.session.myOrderMarkupReply = [
            [`${ctx.i18n.t("ListMyOrders")}`],
            [`${ctx.i18n.t("ListMyCompleteOrders")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ];

        let message = `${ctx.i18n.t("mainMenuOrders")}`;

        if (ctx.scene.state.start) {
            message = ctx.scene.state.start;
        }

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: ctx.session.myOrderMarkupReply,
                resize_keyboard: true,
                // one_time_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });

// listener
    myOrdersEnterScene.hears(I18n.match("ListMyOrders"), async (ctx) => {
       return ctx.scene.enter('myOrdersPending');
    });

// listener
    myOrdersEnterScene.hears(I18n.match("ListMyCompleteOrders"), async (ctx) => {
       return ctx.scene.enter('myOrdersComplete');
    });

// listener
    myOrdersEnterScene.hears(I18n.match("mainMenuBack"), async (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    return myOrdersEnterScene;
};


module.exports.myOrdersPendingScene = (bot, I18n) => {
    const myOrdersPendingScene = new Scene("myOrdersPending");


    myOrdersPendingScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await sendMyOrders(ctx, bot, ['Ожидает', 'Отклонено', 'Принято']);
    });


    myOrdersPendingScene.action('Next', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.myOrdersIndex += 1;
        await sendMyOrders(ctx, bot, ['Ожидает', 'Отклонено', 'Принято']);
    });

    myOrdersPendingScene.action('Previous', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.myOrdersIndex -= 1;
        await sendMyOrders(ctx, bot, ['Ожидает', 'Отклонено', 'Принято']);
    });

    myOrdersPendingScene.action('myOrderMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("myOrders");
    });

    myOrdersPendingScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });


    return myOrdersPendingScene;
};


module.exports.myOrdersCompleteScene = (bot, I18n) => {
    const myOrdersCompleteScene = new Scene("myOrdersComplete");


    myOrdersCompleteScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        await sendMyOrders(ctx, bot, 'Закрыто');
    });


    myOrdersCompleteScene.action('Next', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.myOrdersIndex += 1;
        await sendMyOrders(ctx, bot, 'Закрыто');
    });

    myOrdersCompleteScene.action('Previous', async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.myOrdersIndex -= 1;
        await sendMyOrders(ctx, bot, 'Закрыто');
    });

    myOrdersCompleteScene.action('myOrderMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("myOrders");
    });

    myOrdersCompleteScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });


    return myOrdersCompleteScene;
};
