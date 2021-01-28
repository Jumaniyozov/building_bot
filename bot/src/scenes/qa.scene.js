require('dotenv').config({path: '../../.env'});
const Scene = require('telegraf/scenes/base');
const {Telegraf} = require('telegraf');
const {Extra} = Telegraf;
const {Questions} = require('../models');

module.exports = (bot, I18n) => {
    const askQuestionScene = new Scene('askQuestion');

    askQuestionScene.enter(async (ctx) => {


        ctx.reply(`${ctx.i18n.t('askQuestionExpl')}`, Extra.markup(markup => {
            return markup.keyboard([
                [`${ctx.i18n.t('mainMenuBack')}`]
            ]).resize();
        }))
    });

    askQuestionScene.hears(I18n.match('mainMenuBack'), ctx => {
        ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainMenu')
        })
    })

    askQuestionScene.on('text', async ctx => {
        try {
            if (ctx.message.text !== '') {
                await bot.telegram.sendChatAction(ctx.from.id, 'typing');

                const sendMarkup = `<i>${ctx.from.username}</i>:\n${ctx.message.text}`;

                const msg = await bot.telegram.sendMessage(process.env["QA_GP_ID"], sendMarkup, {
                    parse_mode: "HTML",
                    reply_markup: {
                        inline_keyboard: [[{
                            text: `${ctx.i18n.t('askQuestionCall')}`,
                            callback_data: `${ctx.i18n.t('askQuestionCall')}`
                        }]]
                    }
                });

                Questions.create({
                    username: ctx.from.username,
                    userId: ctx.from.id,
                    question: ctx.message.text,
                    message_id: msg.message_id,
                    message_status: `${ctx.i18n.t('askQuestionCall')}`
                })


                return ctx.scene.enter('mainMenu', {
                    start: ctx.i18n.t('askQuestionSent')
                })
            } else {
                return ctx.scene.enter('askQuestion')
            }
        } catch (e) {
            console.error(e.message);
        }
    });


    return askQuestionScene
}
