const Scene = require("telegraf/scenes/base");
const {cleanMessages, sendCategories, sendSubCategories} = require("../helpers");


module.exports.categoriesScene = (bot, I18n) => {
    const categoriesScene = new Scene("categories");

    categoriesScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        // ctx.session.message_filter.push((await ctx.message).message_id);


        let message = ctx.i18n.t("mainMenuCategories");

        ctx.session.categoriesMenuMarkup = [
            [`${ctx.i18n.t("CategoriesMenuLook")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ];

        ctx.session.currentCategoryLocationIndex = 0;
          //currentSubCategoryLocationIndex

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: ctx.session.categoriesMenuMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });


    // listener
    categoriesScene.hears(I18n.match("CategoriesMenuLook"), async (ctx) => {
        return  ctx.scene.enter('categoriesEnter');
    });

    categoriesScene.hears(I18n.match("mainMenuBack"), async (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    return categoriesScene;
}


module.exports.categoriesEnterScene = (bot, I18n) => {
    const categoriesEnter = new Scene("categoriesEnter");

    categoriesEnter.enter(async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.curtSubCatLocId = 0;
        await sendCategories(ctx, bot);
    });


    categoriesEnter.action('Next', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.currentCategoryLocationIndex += 1;
        await sendCategories(ctx, bot);
    });

    categoriesEnter.action('Previous', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.currentCategoryLocationIndex -= 1;
        await sendCategories(ctx, bot);
    });

    categoriesEnter.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("categories");
    });

    categoriesEnter.action(/^gts:/, async (ctx) => {
        await ctx.answerCbQuery();
        ctx.session.subCategoryParentId =  ctx.update.callback_query.data.split(':')[1];
        return ctx.scene.enter('subCategoriesEnter');
    });

    return categoriesEnter;
};

module.exports.subCategoriesEnterScene = (bot, I18n) => {
    const subCategoriesEnterScene = new Scene("subCategoriesEnter");

    subCategoriesEnterScene.enter(async (ctx) => {
        // await cleanMessages(ctx);
        await sendSubCategories(ctx, bot, ctx.session.subCategoryParentId);
    });


    subCategoriesEnterScene.action('Next', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.curtSubCatLocId += 1;
        await sendSubCategories(ctx, bot, ctx.session.subCategoryParentId);
    });

    subCategoriesEnterScene.action('Previous', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);
        ctx.session.curtSubCatLocId -= 1;
        await sendSubCategories(ctx, bot, ctx.session.subCategoryParentId);
    });


    subCategoriesEnterScene.action('mainMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    subCategoriesEnterScene.action('categoriesMenuBack', async (ctx) => {
        await ctx.answerCbQuery();
        await cleanMessages(ctx);

        return ctx.scene.enter('categoriesEnter');
    });

    subCategoriesEnterScene.action(/^gtp:/, async (ctx) => {
        await ctx.answerCbQuery();

        const categoryId = ctx.update.callback_query.data.split(':')[1];

        console.log(categoryId);

        // await sendSubCategories(ctx, bot, parentId);
    });


    return subCategoriesEnterScene;
};
