const getLocations = require("./getLocations");
const {Extra} = require("telegraf");
const _ = require('lodash');


const sendLocations = async (ctx, bot) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'find_location');

    const {currentLocationIndex} = ctx.session;
    try {


        const locations = await getLocations();

        if (_.isEmpty(locations)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('contactsMenuSocialsEmpty')
            })
        } else {

            const backMenu = [
                [
                    {
                        text: `${ctx.i18n.t('LocationsMenuData')}`,
                        callback_data: `gtd:${locations[currentLocationIndex].id}`
                    }
                ],
                [{
                    text: `${ctx.i18n.t('mainMenuBack')}`,
                    callback_data: `mainMenuBack`
                }]];

            const nextMenu = [{text: '▶️', callback_data: 'Next'}];

            const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];
            const previousMenu = [{text: '◀️', callback_data: 'Previous'}]

            const menu1 = [
                nextMenu,
                ...backMenu
            ]

            const menu2 = [
                nextAndPreviousMenu,
                ...backMenu
            ]

            const menu3 = [
                previousMenu,
                ...backMenu
            ]

            const menu4 = [
                ...backMenu
            ]

            let markupReply = [];

            if (currentLocationIndex === 0) {
                if (currentLocationIndex + 1 < locations.length) {
                    markupReply = menu1;
                } else {
                    markupReply = menu4;
                }
            } else {
                if (currentLocationIndex + 1 < locations.length) {
                    markupReply = menu2;
                } else {
                    markupReply = menu3;
                }
            }


            if (!_.isEmpty(locations[currentLocationIndex])) {
                const msg = await bot.telegram.sendLocation(
                    ctx.chat.id,
                    `${locations[currentLocationIndex].latitude}`, `${locations[currentLocationIndex].longitude}`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            // resize_keyboard: true,
                            inline_keyboard: markupReply,
                            one_time_keyboard: true
                        },
                    }
                );

                ctx.session.currentLocation = locations[currentLocationIndex];

                ctx.session.message_filter.push((await msg).message_id);
            } else {
                const msg = bot.telegram.sendMessage(
                    ctx.chat.id,
                    `${ctx.i18n.t("LocationsMenuBuy")}`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            keyboard: ctx.session.locationsMenuMarkup,
                            resize_keyboard: true,
                            // one_time_keyboard: true
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

module.exports = sendLocations;
