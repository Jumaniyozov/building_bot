const getMyOrders = require("./getMyOrders");
const messageFilter = require('../messageFilter');
const _ = require('lodash');


const sendMyOrders = async (ctx, bot) => {

        await bot.telegram.sendChatAction(ctx.chat.id, 'typing');

        const {myOrdersIndex} = ctx.session;

        try {


            const myOrders = await getMyOrders(ctx);

            if (_.isEmpty(myOrders)) {
                return ctx.scene.enter('mainMenu', {
                    start: ctx.i18n.t('ListMyOrdersEmpt')
                })
            } else {

                const lan = ctx.session.registered.language;

                let message = `
🕰️ <b>${lan === 'ru' ? 'Дата заказа: ' : "Buyurtmaning sanasi: "}</b> ${myOrders[myOrdersIndex].date}
💵 <b>${lan === 'ru' ? 'Сумма: ' : "Summasi: "}</b> ${myOrders[myOrdersIndex].total} ${lan === 'ru' ? 'сум' : "so'm"}

📝 <b>${lan === 'ru' ? 'Список товаров: ' : "Tovarlar ro'yhati: "}</b>`;


                let status = myOrders[myOrdersIndex].status;
                if (status === 'Ожидает') {
                    lan === 'ru' ? status = 'Ожидает' : status = 'Kutilyapti'
                } else if (status === 'Отклонено'){
                    lan === 'ru' ? status = 'Отклонено' : status = 'Rad qilingan'
                } else if (status === 'Принято'){
                    lan === 'ru' ? status = 'Принято но не доставлено' : status = 'Kutilyapti lekin yuborilmagan'
                }


                myOrders[myOrdersIndex].orderItems.map((el, index) => {
                    let msg = `🛍️ <b>${lan === 'ru' ? 'имя: ' : "nomi: "}</b> ${el[`name_${lan}`]}
    🏷️ <b>${lan === 'ru' ? 'цена: ' : "narxi: "}</b> ${el[`price`]} ${lan === 'ru' ? 'сум' : "so'm"}
    🔖 <b>${lan === 'ru' ? 'количество: ' : "qiymati: "}</b> ${el[`item_qty`]}`

                    message += `
${index}) ${msg}

${lan === 'ru' ? 'Статус: ' : 'Holati: '} ${status}
`
                })



                let markupReply = []

                const nextMenu = [{text: '▶️', callback_data: 'Next'}];
                const previousMenu = [{text: '◀️', callback_data: 'Previous'}];
                const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];

                let backMenu = [
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

                    await messageFilter(ctx, msg);
                } else {
                    const msg = bot.telegram.sendMessage(ctx.chat.id, ctx.i18n.t('ListMyOrdersEmpt'), {
                        parse_mode: "HTML",
                        reply_markup: {
                            keyboard: ctx.session.myOrderMarkupReply,
                            resize_keyboard: true,
                        },
                    });

                    await messageFilter(ctx, msg);
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
