const getLocations = require("./getLocations");
const {Extra} = require("telegraf");
const _ = require('lodash');


const sendLocations = async (ctx, bot) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'find_location');

    const {currentLocationIndex} = ctx.session;
try {


    const locations = await getLocations();

    if (_.isEmpty(locations)) {
        const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('contactsMenuSocialsEmpty'), {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: ctx.session.locationsMenuMarkup,
                resize_keyboard: true,
            },
        });
    } else {
        const markupReply = [
            currentLocationIndex === 0
                ? [{text: '▶️', callback_data: 'Next'}]
                : currentLocationIndex + 1 === locations.length
                ? [{text: '◀️', callback_data: 'Previous'}]
                : [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}],
            //TODO: Need to add i18n
            [{text: locations[currentLocationIndex][`description_${ctx.session.registered.language}`], callback_data: 'noCbData'}],
            [{
                text: `${ctx.i18n.t('mainMenuBack')}`,
                callback_data: `mainMenuBack`
            }]
        ]

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
