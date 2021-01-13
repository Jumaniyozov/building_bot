const _ = require("lodash");
const Scene = require("telegraf/scenes/base");
const {OrderItem, Order, User} = require("../models");
const {cleanMessages, getCartList} = require("../helpers");


module.exports.orderEnterScene = (bot, I18n) => {
    const orderEnterScene = new Scene("orderEnter");

    orderEnterScene.enter(async (ctx) => {
        await cleanMessages(ctx);
        if (_.isEmpty(ctx.session.cart)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('CartMenuEmpty')
            })
        }

        ctx.session.order = {};

        const message = await getCartList(ctx);

        const replyMarkup = [
            [`${ctx.i18n.t("OrderMenuContinue")}`],
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


    orderEnterScene.hears(I18n.match("OrderMenuContinue"), (ctx) => {
        return ctx.scene.enter("orderEnterFIO");
    });


    orderEnterScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("cartEnter");
    });

    orderEnterScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    return orderEnterScene;
};


module.exports.orderEnterFIOScene = (bot, I18n) => {
    const orderEnterFIOScene = new Scene("orderEnterFIO");

    orderEnterFIOScene.enter(async (ctx) => {
        // await cleanMessages(ctx);

        const message = ctx.i18n.t('CartMenuEnterFIO');

        const replyMarkup = [
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


    orderEnterFIOScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("orderEnter");
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

        const message = ctx.i18n.t('CartMenuEnterGEO');

        const replyMarkup = [
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

        return ctx.scene.enter('orderEnterDATE');

    });


    orderEnterGEOScene.on('text', async (ctx) => {

        ctx.session.order.GEO = ctx.message.text;

        ctx.session.message_filter.push((await ctx.message.text).message_id);

        return ctx.scene.enter('orderEnterDATE');

    });

    return orderEnterGEOScene;
};

module.exports.orderEnterDATEScene = (bot, I18n) => {
    const orderEnterDATEScene = new Scene("orderEnterDATE");

    orderEnterDATEScene.enter(async (ctx) => {

        const message = ctx.i18n.t('CartMenuEnterDATE');

        const replyMarkup = [
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


    orderEnterDATEScene.hears(I18n.match("OrderMenuBack"), (ctx) => {
        return ctx.scene.enter("orderEnterGEO");
    });

    orderEnterDATEScene.hears(I18n.match("mainMenuBack"), (ctx) => {
        return ctx.scene.enter("mainMenu", {
            start: ctx.i18n.t("mainMenu"),
        });
    });

    orderEnterDATEScene.on('text', async (ctx) => {

        ctx.session.order.DATE = ctx.message.text;
        ctx.session.message_filter.push((await ctx.message.text).message_id);

        return ctx.scene.enter('orderEnterPayType');

    });

    return orderEnterDATEScene;
};

module.exports.orderEnterPayTypeScene = (bot, I18n) => {
    const orderEnterPayTypeScene = new Scene("orderEnterPayType");

    orderEnterPayTypeScene.enter(async (ctx) => {

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
        return ctx.scene.enter("orderEnterDATE");
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

        let message = `${ctx.i18n.t('CartMenuConfirm')}

${lan === 'ru' ? 'ФИО' : 'FIO'}: ${order.FIO}
${lan === 'ru' ? 'Локация' : 'Manzil'}: ${typeof order.GEO === 'object' ? (
            `${lan === 'ru' ? (`широта: ${order.GEO.latitude}, долгота: ${order.GEO.longitude}`)
                : `uzunlik: ${order.GEO.latitude}, balandlik: ${order.GEO.longitude}`}`) : (order.GEO)}
${lan === 'ru' ? `Дата` : `Sana`}: ${order.DATE}
${lan === 'ru' ? `Способ оплаты` : `To'lov turi`}: ${order.PayType}
${lan === 'ru' ? `Номер телефона` : `Telefon raqami`}: ${ctx.session.registered.phone}
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
                receiveDate: ctx.session.order.DATE,
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

            for (const prop of Object.getOwnPropertyNames(ctx.session.cart)) {
                delete ctx.session.cart[prop];
            }

            return ctx.scene.enter("mainMenu", {
                start: ctx.i18n.t('CartMenuOrderPending')
            });
        } catch(error) {
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
