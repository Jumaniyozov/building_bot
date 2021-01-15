require('dotenv').config();
const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const {calendar} = require("../helpers");
const {Extra} = require("telegraf");
const {OrderItem, Order, User} = require("../models");
const {cleanMessages} = require("../helpers");

module.exports.orderEnterFIOScene = (bot, I18n) => {
    const orderEnterFIOScene = new Scene("orderEnterFIO");

    orderEnterFIOScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        ctx.session.order = {};

        const message = ctx.i18n.t('CartMenuEnterFIO');

        const replyMarkup = [
            [`${ctx.i18n.t("OrderMenuBack")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ]

        const d = new Date(Date.now());
        ctx.session.currentMonth = d.getMonth();
        ctx.session.storeMonth = d.getMonth();
        ctx.session.endDate = false;

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });


    orderEnterFIOScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("cartEnter");
    });

    orderEnterFIOScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    orderEnterFIOScene.on('text', async (ctx) => {

        ctx.session.order.FIO = ctx.message.text;

        ctx.session.message_filter.push((await ctx.message.text).message_id);
        return ctx.scene.enter('orderEnterGEO');

    });

    return orderEnterFIOScene;
};

module.exports.orderEnterGEOScene = (bot, I18n) => {
    const orderEnterGEOScene = new Scene("orderEnterGEO");

    orderEnterGEOScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        const message = ctx.i18n.t('CartMenuEnterGEO');
        ctx.session.endDate = false;
        const replyMarkup = [
            [{text: `${ctx.i18n.t("CartMenuEnterGEOShare")}`, request_location: true}],
            [`${ctx.i18n.t("OrderMenuBack")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ]

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });


    orderEnterGEOScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("orderEnterFIO");
    });

    orderEnterGEOScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });


    orderEnterGEOScene.on('location', async (ctx) => {

        ctx.session.order.GEO = ctx.message.location;

        // ctx.session.message_filter.push((await ctx.message.text).message_id);

        return ctx.scene.enter('createRequestPeriod');

    });


    orderEnterGEOScene.on('text', async (ctx) => {

        ctx.session.order.GEO = ctx.message.text;

        ctx.session.message_filter.push((await ctx.message.text).message_id);

        return ctx.scene.enter('createRequestPeriod');

    });

    return orderEnterGEOScene;
};


module.exports.createOrderPeriodScene = (bot, I18n) => {

    const createRequestPeriodScene = new Scene('createRequestPeriod');

    createRequestPeriodScene.enter(async ctx => {
        await cleanMessages(ctx);


        const replyMarkup = [
            [`${ctx.i18n.t("OrderMenuBack")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ]

        const msge = bot.telegram.sendMessage(ctx.chat.id, `${ctx.i18n.t("CartMenuEnterDateMsg")}`, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msge).message_id);

        if (ctx.session.endDate) {
            const msg = ctx.reply(`⚠️ ${ctx.i18n.t('CartMenuEnterEndDate')}`, Extra.markup(markup => {
                return markup.inlineKeyboard(calendar(ctx.session.currentMonth, ctx)).resize();
            }));

            ctx.session.message_filter.push((await msg).message_id);
        } else {

            const msg = ctx.reply(`❗ ${ctx.i18n.t('CartMenuEnterStartDate')}`, Extra.markup(markup => {
                return markup.inlineKeyboard(calendar(ctx.session.currentMonth, ctx)).resize();
            }));

            ctx.session.message_filter.push((await msg).message_id);
        }


    })

    createRequestPeriodScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("orderEnterGEO");
    });

    createRequestPeriodScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });


    createRequestPeriodScene.on('callback_query', ctx => {

        if (ctx.update.callback_query.data === 'Previous') {
            ctx.answerCbQuery();
            ctx.session.currentMonth = ctx.session.currentMonth - 1;
            return ctx.scene.enter('createRequestPeriod')
        } else if (ctx.update.callback_query.data === 'Next') {
            ctx.answerCbQuery();
            ctx.session.currentMonth = ctx.session.currentMonth + 1;
            return ctx.scene.enter('createRequestPeriod')
        } else {
            ctx.answerCbQuery();
            if (ctx.update.callback_query.data === 'ignore') {

            } else if (
                ctx.update.callback_query.data !== 'year' ||
                ctx.update.callback_query.data !== 'month') {

                ctx.session.order.Date = ctx.update.callback_query.data;
                return ctx.scene.enter('orderEnterPayType')

            }

        }
    })

    return createRequestPeriodScene;
}

module.exports.orderEnterPayTypeScene = (bot, I18n) => {
    const orderEnterPayTypeScene = new Scene("orderEnterPayType");

    orderEnterPayTypeScene.enter(async (ctx) => {
        await cleanMessages(ctx);

        ctx.session.endDate = false;
        const message = ctx.i18n.t('CartMenuEnterPayType');

        const replyMarkup = [
            [`${ctx.i18n.t("CartMenuOrderPayCash")}`],
            [`${ctx.i18n.t("CartMenuOrderPayCard")}`],
            [`${ctx.i18n.t("OrderMenuBack")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ]

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });


    orderEnterPayTypeScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("createRequestPeriod");
    });

    orderEnterPayTypeScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    orderEnterPayTypeScene.on('text', async (ctx) => {

        if (ctx.message.text === ctx.i18n.t('CartMenuOrderPayCash') ||
            ctx.message.text === ctx.i18n.t('CartMenuOrderPayCard')) {

            ctx.session.order.PayType = ctx.message.text;

            ctx.session.message_filter.push((await ctx.message.text).message_id);

            return ctx.scene.enter('orderEnterConfirmation');
        } else {
            ctx.session.message_filter.push((await ctx.message.text).message_id);
            return ctx.scene.enter('orderEnterPayType');
        }
    });

    return orderEnterPayTypeScene;
};

module.exports.orderEnterConfirmationScene = (bot, I18n) => {
    const orderEnterConfirmationScene = new Scene("orderEnterConfirmation");

    orderEnterConfirmationScene.enter(async (ctx) => {
        const lan = ctx.session.registered.language;


        const {order} = ctx.session;

        let message = `📝 <b>${ctx.i18n.t('CartMenuConfirm')}</b>


📑 ${lan === 'ru' ? 'ФИО' : 'FIO'}: ${order.FIO}

${typeof order.GEO === 'object' ? '' : `${lan === 'ru' ? `🗺️ Локация: ${order.GEO}` : `🗺️ Manzil: ${order.GEO}`}`} 

📅 ${lan === 'ru' ? `Дата` : `Sana`}: ${ctx.session.order.Date}

💳 ${lan === 'ru' ? `Способ оплаты` : `To'lov turi`}: ${order.PayType}

📱 ${lan === 'ru' ? `Номер телефона` : `Telefon raqami`}: ${ctx.session.registered.phone}
`;

        const replyMarkup = [
            [`${ctx.i18n.t("OrderMenuTrue")}`],
            [`${ctx.i18n.t("OrderMenuBack")}`],
            [`${ctx.i18n.t("mainMenuBack")}`],
        ]

        const msg = bot.telegram.sendMessage(ctx.chat.id, message, {
            parse_mode: "HTML",
            reply_markup: {
                keyboard: replyMarkup,
                resize_keyboard: true
            },
        });

        ctx.session.message_filter.push((await msg).message_id);
    });


    orderEnterConfirmationScene.hears(I18n.match("OrderMenuTrue"), async (ctx) => {
        await cleanMessages(ctx);
        await bot.telegram.sendChatAction(ctx.chat.id, 'typing');
        let GEO = ctx.session.order.GEO;
        if (typeof ctx.session.order.GEO === 'object') {
            GEO = `latitude: ${GEO.latitude}, longitude: ${GEO.longitude}`;
        }

        const cartList = _.values(ctx.session.cart);

        const userId = await User.findOne({where: {userId: ctx.from.id}});


        try {
            const order = await Order.create({
                userId: userId.dataValues.id,
                subtotal: ctx.session.cartTotal,
                total: ctx.session.cartTotal,
                FIO: ctx.session.order.FIO,
                geoLocation: GEO,
                receiveDate: ctx.session.order.Date,
                paymentType: ctx.session.order.PayType,
                status: 'Ожидает',
            }).catch(error => console.error(error));


            await Promise.all(cartList.map(el => {
                return OrderItem.create({
                    productId: el.id,
                    orderId: order.id,
                    quantity: +el.quantity
                })
            })).catch(error => console.error(error));

            let msg = `
📑 ID пользователья: ${userId.dataValues.id}
📦 ID заказа: ${order.id}
📝 ФИО: ${ctx.session.order.FIO}
📱 Номер телефона: ${ctx.session.registered.phone}
${typeof ctx.session.order.GEO !== 'object' ? `🗺️ Локация: ${ctx.session.order.GEO}` : ''}
📅 Дата получения:${ctx.session.order.Date}
💳 Тип оплаты: ${ctx.session.order.PayType}
🧾 <b>Общая сумма: ${ctx.session.cartTotal} сум</b>
`
            let markupReply = [
                [{
                    text: 'Принять заказ',
                    callback_data: `acceptOrder:${order.id}:${ctx.from.id}:${ctx.session.registered.language}:${order.id}`
                }],
                [{
                    text: `Отменить заказ`,
                    callback_data: `cancelOrder:${order.id}:${ctx.from.id}:${ctx.session.registered.language}:${order.id}`
                }],
            ]


            if (typeof ctx.session.order.GEO === 'object') {
                const msge = await bot.telegram.sendLocation(process.env.ORDER_GP_ID, ctx.session.order.GEO.latitude, ctx.session.order.GEO.longitude);

                await bot.telegram.sendMessage(
                    process.env.ORDER_GP_ID,
                    msg,
                    {
                        parse_mode: "HTML",
                        reply_to_message_id: msge.message_id,
                        reply_markup: {
                            inline_keyboard: markupReply
                        },
                    })

            } else {
                await bot.telegram.sendMessage(
                    process.env.ORDER_GP_ID,
                    msg,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: markupReply
                        },
                    })
            }

            for (const prop of Object.getOwnPropertyNames(ctx.session.cart)) {
                delete ctx.session.cart[prop];
            }

            return ctx.scene.enter("mainMenu", {
                start: ctx.i18n.t('CartMenuOrderPending')
            });
        } catch (error) {
            console.error(error.message);
        }
    });

    orderEnterConfirmationScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("orderEnterPayType");
    });

    orderEnterConfirmationScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    return orderEnterConfirmationScene;
};
