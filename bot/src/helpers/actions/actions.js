const _ = require('lodash');
const moment = require('moment');
const messageFilter = require("../messageFilter");
const {Actions} = require("../../models");


const sendActions = async (ctx, bot) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'typing');

    const {actionIndex} = ctx.session;

    try {


        const actions = await Actions.findAll({where: {status: 'Активен'}});

        if (_.isEmpty(actions)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('ActionsMenuEmpty')
            })
        } else {

            const lan = ctx.session.registered.language;

            let message = `
${actions[actionIndex][`name_${lan}`]}

${actions[actionIndex][`description_${lan}`]}

${lan === 'ru' ? 'Действителен с: ' : "Ushbu sanadan: "} ${moment(actions[actionIndex].active_from).format('l')}      ${lan === 'ru' ? `До: ${moment(actions[actionIndex].active_to).format('l')}` : `${moment(actions[actionIndex].active_to).format('l')} gacha mavjud`}
`;

            let markupReply = [];

            const nextMenu = [{text: '▶️', callback_data: 'Next'}];
            const previousMenu = [{text: '◀️', callback_data: 'Previous'}];
            const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];

            let backMenu = [{
                text: `${ctx.i18n.t('mainMenuBack')}`,
                callback_data: `mainMenuBack`
            }]

            if (actionIndex === 0) {
                if (actions.length === 1) {
                    markupReply = [backMenu];
                } else {
                    markupReply = [nextMenu, backMenu];
                }
            } else {
                if (actionIndex + 1 === actions.length) {
                    markupReply = [previousMenu, backMenu];
                } else {
                    markupReply = [nextAndPreviousMenu, backMenu];
                }
            }


            if (!_.isEmpty(actions[actionIndex])) {

                const msg = await bot.telegram.sendPhoto(
                    ctx.chat.id,
                    `${actions[actionIndex].photoUrl}`,
                    {
                        parse_mode: "HTML",
                        caption: message,
                        reply_markup: {
                            inline_keyboard: markupReply,
                            // one_time_keyboard: true
                        },
                    }
                );
                await messageFilter(ctx, msg);

            } else {
                return ctx.scene.enter('mainMenu', {
                    start: ctx.i18n.t('ActionsMenuEmpty')
                })
            }
        }
    } catch (error) {
        console.error(error);
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainErrorMessage')
        })
    }
};

module.exports = sendActions;
