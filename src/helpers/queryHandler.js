const _ = require('lodash');
const messageFilter = require("./messageFilter");
const {Product} = require('../models');

const inlineQueryHandler = async (ctx, next, bot) => {

    if (!_.isEmpty(ctx.message.text)) {
        try {
            if (ctx.message.text.match(/08451193-3893-4477-939b-47b9f4780a61/)) {
                const prodId = ctx.message.text.split('prodId: ')[1];
                const product = await Product.findByPk(prodId);


                await ctx.deleteMessage(ctx.message.message_id);

                const lan = ctx.session.registered.language;

                const msge = `
🛍️ ${lan === 'ru' ? 'Имя товар' : 'Tovar nomi'}: ${product.dataValues[`name_${lan}`]}
📄 ${lan === 'ru' ? 'Описание' : 'Tasnifi'}: ${product.dataValues[`description_${lan}`]}
🏷️ ${lan === 'ru' ? 'Цена' : 'Narxi'}: ${product.dataValues[`price`]}
`
                let msg;

                if (product.dataValues.photoUrl) {

                    msg = await bot.telegram.sendPhoto(ctx.from.id, product.dataValues.photoUrl, {
                        parse_mode: "HTML",
                        caption: msge,
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                    text: `${lan === 'ru' ? '🛒 Добавить в корзину' : `🛒 Savatga qo'shish`}`,
                                    callback_data: `atcifs:${prodId}`
                                }],
                                [{text: `❌`, callback_data: `rtcifs:${prodId}`}],
                            ],
                            resize_keyboard: true
                        },
                    });

                } else {
                    msg = await bot.telegram.sendMessage(ctx.from.id, msge, {
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: [
                                [{
                                    text: `${lan === 'ru' ? '🛒 Добавить в корзину' : `🛒 Savatga qo'shish`}`,
                                    callback_data: `atcifs:${prodId}`
                                }],
                                [{text: `❌`, callback_data: `rtcifs:${prodId}`}],
                            ],
                            resize_keyboard: true
                        },
                    });
                }

                await messageFilter(ctx, msg);
                return
            }
        } catch (err) {
            console.error(err.message);
        }
    }

    return await next();
};


module.exports = inlineQueryHandler;
