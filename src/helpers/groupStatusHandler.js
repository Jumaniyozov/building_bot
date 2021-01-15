require('dotenv').config({path: '../../.env'});
const {Order} = require('../models');
const _ = require('lodash');

const groupStatusHandler = async (ctx, bot) => {

    if (!_.isEmpty(ctx.update.callback_query)) {
          if (+ctx.update.callback_query.message.chat.id === +process.env.ORDER_GP_ID) {
            let status = '';
            const dataInst = ctx.update.callback_query.data.split(':');
            if (dataInst[0] === 'acceptOrder') {
                status = 'Принято';

                await bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id,
                    +ctx.update.callback_query.message.message_id,
                    null,
                    {
                        inline_keyboard: [
                            [{text: status, callback_data: 'noCbDDD'}],
                            [{
                                text: 'Закрыть',
                                callback_data: `orderClose:${dataInst[1]}:${dataInst[2]}:${dataInst[3]}:${dataInst[4]}`
                            }],
                            [{
                                text: 'Отклонить',
                                callback_data: `acceptCancel:${dataInst[1]}:${dataInst[2]}:${dataInst[3]}:${dataInst[4]}`
                            }]
                        ]
                    }
                )

                await Order.update({status: 'Принято'}, {where: {id: dataInst[1]}})
                    .catch(error => console.error(error.message));

                let msg = dataInst[3] === 'ru' ? `<b>Ваш заказ с ID ${dataInst[4]} был принят.</b>` : `<b>Sizning ${dataInst[4]} IDlik buyurtmangiz qabul qilindi.</b>`;

                bot.telegram.sendMessage(dataInst[2], msg, {parse_mode: "HTML"});

            } else if (dataInst[0] === 'acceptCancel' || dataInst[0] === 'cancelOrder') {
                status = 'Отклонено';

                await bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id,
                    +ctx.update.callback_query.message.message_id,
                    null,
                    {
                        inline_keyboard: [
                            [{text: status, callback_data: 'noCbDDD'}]
                        ]
                    }
                )

                await Order.update({status: 'Отклонено'}, {where: {id: dataInst[1]}})
                    .catch(error => console.error(error.message));

                let msg = dataInst[3] === 'ru' ? `<b>Извините но ваш заказ с ID ${dataInst[4]} был отменен.</b>` : `<b>Kechirasiz sizning ${dataInst[4]} IDlik buyurtmangiz rad qilindi.</b>`;

                bot.telegram.sendMessage(dataInst[2], msg,{parse_mode: "HTML"});

            } else if (dataInst[0] === 'orderClose') {
                status = 'Закрыто';

                await bot.telegram.editMessageReplyMarkup(ctx.update.callback_query.message.chat.id,
                    +ctx.update.callback_query.message.message_id,
                    null,
                    {
                        inline_keyboard: [
                            [{text: status, callback_data: 'noCbDDD'}]
                        ]
                    }
                )

                await Order.update({status: 'Закрыто'}, {where: {id: dataInst[1]}})
                    .catch(error => console.error(error.message));

                let msg = dataInst[3] === 'ru' ? `<b>Ваш заказ с ID: ${dataInst[4]} был закрыт.</b>` : `<b>Sizning ${dataInst[4]} IDlik buyurtmangiz yopildi.</b>`;

                bot.telegram.sendMessage(dataInst[2], msg, {parse_mode: "HTML"});


            }
        }
    }
}

module.exports = groupStatusHandler;
