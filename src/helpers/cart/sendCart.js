const _ = require('lodash');


const sendCart = async (ctx, bot) => {

    await bot.telegram.sendChatAction(ctx.chat.id, 'find_location');

    const {cart, cartItemIndex} = ctx.session;

    if (_.isEmpty(ctx.session.cart)) {
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('CartMenuEmpty')
        })
    }

    try {

        const listLength = 5;
        const cartList = _.values(cart);

        const cartItemsLength = cartList.length / listLength;


        const list = cartList
            .slice(cartItemIndex === 0 ? 0 : cartItemIndex * listLength,
                cartItemIndex === 0 ? listLength : (cartItemIndex + 1) * listLength);


        if (cartItemsLength === cartItemIndex) {
            ctx.session.cartItemIndex -= 1;
            return ctx.scene.enter('cartEnter');
        }
        let lan = ctx.session.registered.language;

        let message = lan === 'ru' ? `🧮 <b>Ваша корзина: </b>\n` : `🧮 <b>Sizning savatingiz</b>\n`;
        let total = 0;

        const categoryMarkup = list.map(el => {

            message += `
🛍️ ${el[`name_${lan}`]} 
🏷️ ${el.price} ${el.discount === 0 ? '' : `(${el.discount}%)`} x ${el.quantity} = ${((el.price - (el.price * (el.discount / 100))) * el.quantity)} ${lan === 'ru' ? 'сум' : `'so'm`}
`;

            if(el.discount !== null) {
              total +=  ((el.price - (el.price * (el.discount / 100))) * el.quantity)
            } else {
                total += el.price*el.quantity
            }

            return [
                [
                    {
                        text: `${el[`name_${lan}`]} ${el.quantity} ${lan === 'ru' ? 'шт.' :  'ta'}`,
                        callback_data: `cid:${el.id}`
                    }
                ],
                [
                    {
                        text: `➖`,
                        callback_data: `cmi:${el.id}:${el.quantity}`
                    },
                    {
                        text: `❌`,
                        callback_data: `cri:${el.id}`
                    },
                    {
                        text: `➕`,
                        callback_data: `cai:${el.id}:${el.quantity}`
                    }
                ]
            ]
        })

        message += `

<b>💷 ${lan === 'ru' ? `В итоге: ${total} сум` : `Umumiy: ${total} so'm`} </b>
`

        const backMenu = [
            [
                {
                    text: `${ctx.i18n.t('CartMenuMakeOrder')}`,
                    callback_data: `makeOrder`
                }
            ],
            [
                {
                    text: `${ctx.i18n.t('CartMenuList')}`,
                    callback_data: `showList`
                }
            ]
        ];

        const nextMenu = [{text: '▶️', callback_data: 'Next'}];

        const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];
        const previousMenu = [{text: '◀️', callback_data: 'Previous'}]

        const menu1 = [
            ...categoryMarkup.flat(1),
            nextMenu,
            ...backMenu
        ]

        const menu2 = [
            ...categoryMarkup.flat(1),
            nextAndPreviousMenu,
            ...backMenu
        ]

        const menu3 = [
            ...categoryMarkup.flat(1),
            previousMenu,
            ...backMenu
        ]

        const menu4 = [
            ...categoryMarkup.flat(1),
            ...backMenu
        ]

        let markupReply = [];

        if (cartItemIndex === 0) {
            if (cartItemIndex + 1 < cartItemsLength) {
                markupReply = menu1;
            } else {
                markupReply = menu4;
            }
        } else {
            if (cartItemIndex + 1 < cartItemsLength) {
                markupReply = menu2;
            } else {
                markupReply = menu3;
            }
        }


        if (ctx.scene.state.start) {
            message = ctx.scene.state.start
        }



        let messaget = ctx.i18n.t('mainMenuCart');

        const authMsg = [
            [`${ctx.i18n.t('CartMenuClear')}`],
            [`${ctx.i18n.t('mainMenuBack')}`],
        ]

        if (ctx.scene.state.start) {
            messaget = ctx.scene.state.start
        }

        const msge = await bot.telegram.sendMessage(ctx.chat.id, messaget, {
            parse_mode: 'HTML',
            reply_markup: {
                keyboard: authMsg,
                resize_keyboard: true
            }
        })

        ctx.session.message_filter.push((await msge).message_id);


        const msg = await bot.telegram.sendMessage(
            ctx.chat.id,
            message,
            {
                parse_mode: "HTML",
                reply_markup: {
                    // resize_keyboard: true,
                    inline_keyboard: markupReply,
                    resize_keyboard: true,
                    one_time_keyboard: true
                },
            }
        );
        ctx.session.message_filter.push((await msg).message_id);

    } catch (error) {
        console.error(error);
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainErrorMessage')
        })
    }
};

module.exports = sendCart;
