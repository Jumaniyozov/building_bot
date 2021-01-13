const getCategories = require("./getCategories");
const _ = require('lodash');
const cleanMessages = require('../cleaner');



const sendCategories = async (ctx, bot) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'find_location');

    const {currentCategoryLocationIndex} = ctx.session;


    try {

        const listLength = 10;

        const categories = await getCategories();



        if (_.isEmpty(categories)) {
            const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('CategoriesMenuEmpty'), {
                parse_mode: "HTML",
                reply_markup: {
                    keyboard: ctx.session.categoriesMenuMarkup,
                    resize_keyboard: true,
                },
            });

        } else {

            const categoryLength = categories.length / listLength;

            const list = categories
                .slice(currentCategoryLocationIndex === 0 ? 0 : currentCategoryLocationIndex * listLength,
                    currentCategoryLocationIndex === 0 ? listLength : (currentCategoryLocationIndex + 1) * listLength);


            const categoryMarkup = list.map(el => {
                return [{
                    text: `${el[`name_${ctx.session.registered.language}`]}`,
                    callback_data: `gts:${el.id}`
                }]
            })

            const backMenu =  [{
                text: `${ctx.i18n.t('CategoriesMenuBack')}`,
                callback_data: `mainMenuBack`
            }];

            const nextMenu = [{text: '▶️', callback_data: 'Next'}];

            const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];
            const previousMenu = [{text: '◀️', callback_data: 'Previous'}]

            const menu1 = [
                ...categoryMarkup,
                nextMenu,
                backMenu
            ]

            const menu2 = [
                ...categoryMarkup,
                nextAndPreviousMenu,
                backMenu
            ]

            const menu3 = [
                ...categoryMarkup,
                previousMenu,
                backMenu
            ]

            const menu4 = [
                ...categoryMarkup,
                backMenu
            ]

            let markupReply = [];

            if( currentCategoryLocationIndex === 0) {
                if(currentCategoryLocationIndex + 1 < categoryLength){
                    markupReply = menu1;
                } else {
                    markupReply = menu4;
                }
            } else {
                if(currentCategoryLocationIndex + 1 < categoryLength) {
                    markupReply = menu2;
                } else {
                    markupReply = menu3;
                }
            }

            let message = ctx.i18n.t('mainMenuCategories');

            if (ctx.scene.state.start) {
                message = ctx.scene.state.start
            }

            if (!_.isEmpty(categoryMarkup)) {
                const msg = await bot.telegram.sendMessage(
                    ctx.chat.id,
                    message,
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

module.exports = sendCategories;
