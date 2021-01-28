require('dotenv').config({path: '../../.env'});
const {Questions} = require('../models');
const _ = require('lodash');

const QaHandler = async (ctx, bot) => {
    if (ctx.update.channel_post) {
        const post = ctx.update.channel_post
        if (post.chat.id === +process.env.QA_GP_ID && !_.isEmpty(post.reply_to_message)) {

            const qstn = await Questions.findOne({
                where:
                    {message_id: post.reply_to_message.message_id}
            })


            if (!qstn.dataValues.answer) {
                let question = qstn.dataValues;

                await Questions.update(
                    {
                        answer: post.text,
                        message_status: `Отвечено`
                    },
                    {
                        where:
                            {message_id: ctx.update.channel_post.reply_to_message.message_id}
                    });

                const sendMarkup = `
<b>${ctx.i18n.t('askQuestionUserMessage')}</b>
<i>${question.question}</i>\n
${post.text}
`

                await bot.telegram.sendMessage(question.userId, sendMarkup, {
                    parse_mode: "HTML",
                });

                await bot.telegram.editMessageReplyMarkup(process.env["QA_GP_ID"], question.message_id, null,
                    {
                        inline_keyboard: [[{
                            text: `Отвечено`,
                            callback_data: `Отвечено`
                        }]]

                    })
            } else {
                console.log('no question');
            }
        }
    }
};

module.exports = QaHandler;
