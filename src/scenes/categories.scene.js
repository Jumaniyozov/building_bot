const Scene = require("telegraf/scenes/base");
const {getProducts} = require("../helpers");
const {cleanMessages, sendCategories, sendSubCategories} = require("../helpers");


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
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    categoriesEnter.action('goToCart', async (ctx) => {
        ctx.scene.enter('cartEnter');
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

        ctx.session.productLocationIndex = 0;

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

    subCategoriesEnterScene.action('goToCart', async (ctx) => {
        ctx.scene.enter('cartEnter');
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

        ctx.session.categoryId = ctx.update.callback_query.data.split(':')[1];


        return ctx.scene.enter('products');

    });


    return subCategoriesEnterScene;
};
