const getMyOrders = require("./getMyOrders");

const _ = require('lodash');


const sendMyOrders = async (ctx, bot, variance) => {

        await bot.telegram.sendChatAction(ctx.chat.id, 'typing');

        const {myOrdersIndex} = ctx.session;

        try {


            const myOrders = await getMyOrders(ctx, variance);

            if (_.isEmpty(myOrders)) {
                return ctx.scene.enter('mainMenu', {
                    start: ctx.i18n.t('ListMyOrdersEmpt')
                })
            } else {

                const lan = ctx.session.registered.language;

                let message = `
${lan === 'ru' ? 'ID заказа: ' : "Buyurtmaning ID si: "} ${myOrders[myOrdersIndex].order_id}
${lan === 'ru' ? 'Время заказа: ' : "Buyurtmaning sanasi: "} ${myOrders[myOrdersIndex].date}
${lan === 'ru' ? 'Сумма: ' : "Summasi: "} ${myOrders[myOrdersIndex].total}

${lan === 'ru' ? 'Список товаров: ' : "Tovarlar ro'yhati: "}`;

                myOrders[myOrdersIndex].orderItems.map((el, index) => {
                    let msg = `${lan === 'ru' ? 'имя: ' : "nomi: "} ${el[`name_${lan}`]}
    ${lan === 'ru' ? 'цена: ' : "narxi: "} ${el[`price`]}
    ${lan === 'ru' ? 'количество: ' : "qiymati: "} ${el[`item_qty`]}`

                    message += `
${index}) ${msg}
`
                })


                let status = '';
                if (myOrders[myOrdersIndex].status === 'Ожидает') {
                    lan === 'ru' ? status = `Ожидает` : status = 'Kutilyapti'
                }


                let markupReply = []

                const nextMenu = [{text: '▶️', callback_data: 'Next'}];
                const previousMenu = [{text: '◀️', callback_data: 'Previous'}];
                const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];

                let backMenu = [
                    [{
                        text: status,
                        callback_data: 'noCbData'
                    }],
                    [{
                        text: `${ctx.i18n.t('OrderMenuBack')}`,
                        callback_data: `myOrderMenuBack`
                    }],
                    [{
                        text: `${ctx.i18n.t('mainMenuBack')}`,
                        callback_data: `mainMenuBack`
                    }]
                ]

                if (myOrdersIndex === 0) {
                    if (myOrders.length === 1) {
                        markupReply = [...backMenu];
                    } else {
                        markupReply = [nextMenu, ...backMenu];
                    }
                } else {
                    if (myOrdersIndex + 1 === myOrders.length) {
                        markupReply = [previousMenu,...backMenu];
                    } else {
                        markupReply = [nextAndPreviousMenu, ...backMenu];
                    }
                }


                if (!_.isEmpty(myOrders[myOrdersIndex])) {

                    const msg = await bot.telegram.sendMessage(
                        ctx.chat.id,
                        `${message}`,
                        {
                            parse_mode: "HTML",
                            reply_markup: {
                                inline_keyboard: markupReply,
                                // one_time_keyboard: true
                            },
                        }
                    );

                    ctx.session.message_filter.push((await msg).message_id);
                } else {
                    const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('ListMyOrdersEmpt'), {
                        parse_mode: "HTML",
                        reply_markup: {
                            keyboard: ctx.session.myOrderMarkupReply,
                            resize_keyboard: true,
                        },
                    });

                    ctx.session.message_filter.push((await msg).message_id);
                }
            }
        } catch
            (error) {
            console.error(error);
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('mainErrorMessage')
            })
        }
    }
;

module.exports = sendMyOrders;
