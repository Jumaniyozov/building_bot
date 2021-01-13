const getSubCategories = require("./getSubCategories");
const _ = require('lodash');
const sendCategories = require("./sendCategories");
const cleanMessages = require('../cleaner');


const sendSubCategories = async (ctx, bot, parentId) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'find_location');

    const {curtSubCatLocId} = ctx.session;

    try {

        const listLength = 10;

        const categories = await getSubCategories(parentId);

        if (_.isEmpty(categories)) {

            ctx.session.message_filter.push((await ctx.reply(ctx.i18n.t('SubCategoriesMenuEmpty'))).message_id);

            return ctx.scene.enter('categoriesEnter');
        } else {
            await cleanMessages(ctx);


            const categoryLength = categories.length / listLength;

            const list = categories
                .slice(curtSubCatLocId === 0 ? 0 : curtSubCatLocId * listLength,
                    curtSubCatLocId === 0 ? listLength : (curtSubCatLocId + 1) * listLength);

            const categoryMarkup = list.map(el => {
                return [{
                    text: `${el[`name_${ctx.session.registered.language}`]}`,
                    callback_data: `gtp:${el.id}`
                }]
            })

            const backMenu = [[{
                text: `${ctx.i18n.t('CategoriesMenuBack')}`,
                callback_data: `categoriesMenuBack`
            }],
                [{
                    text: `${ctx.i18n.t('mainMenuBack')}`,
                    callback_data: `mainMenuBack`
                }]];

            const nextMenu = [{text: '▶️', callback_data: 'Next'}];

            const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];
            const previousMenu = [{text: '◀️', callback_data: 'Previous'}]

            const menu1 = [
                ...categoryMarkup,
                nextMenu,
                ...backMenu
            ]

            const menu2 = [
                ...categoryMarkup,
                nextAndPreviousMenu,
                ...backMenu
            ]

            const menu3 = [
                ...categoryMarkup,
                previousMenu,
                ...backMenu
            ]

            const menu4 = [
                ...categoryMarkup,
                ...backMenu
            ]

            let markupReply = [];

            if( curtSubCatLocId === 0) {
                if(curtSubCatLocId + 1 < categoryLength){
                    markupReply = menu1;
                } else {
                    markupReply = menu4;
                }
            } else {
                if(curtSubCatLocId + 1 < categoryLength) {
                    markupReply = menu2;
                } else {
                    markupReply = menu3;
                }
            }

            if (!_.isEmpty(categoryMarkup)) {
                const msg = await bot.telegram.sendMessage(
                    ctx.chat.id,
                    `${ctx.i18n.t('mainMenuCategories')}`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            // resize_keyboard: true,
                            inline_keyboard: markupReply,
                            one_time_keyboard: true
                        },
                    }
                );
                ctx.session.message_filter.push((await msg).message_id);
            } else {
                const msg = bot.telegram.sendMessage(
                    ctx.chat.id,
                    `${ctx.i18n.t("CategoriesMenuEmpty")}`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            keyboard: ctx.session.categoriesMenuMarkup,
                            resize_keyboard: true,
                        },
                    }
                );
                ctx.session.message_filter.push((await msg).message_id);
            }
        }
    } catch (error) {
        console.error(error);
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainErrorMessage')
        })
    }
};

module.exports = sendSubCategories;
