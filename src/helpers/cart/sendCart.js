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

        const listLength = 10;
        const cartList = _.values(cart);

        const cartItemsLength = cartList.length / listLength;


        const list = cartList
            .slice(cartItemIndex === 0 ? 0 : cartItemIndex * listLength,
                cartItemIndex === 0 ? listLength : (cartItemIndex + 1) * listLength);


        if (cartItemsLength === cartItemIndex) {
            ctx.session.cartItemIndex -= 1;
            return ctx.scene.enter('cartMenuEnter');
        }

        const categoryMarkup = list.map(el => {
            return [
                {
                    text: `➖`,
                    callback_data: `cmi:${el.id}:${el.quantity}`
                },
                {
                    text: `${el[`name_${ctx.session.registered.language}`]}`,
                    callback_data: `cid:${el.id}`
                },
                {
                    text: `➕`,
                    callback_data: `cai:${el.id}:${el.quantity}`
                },
                {
                    text: `❌`,
                    callback_data: `cri:${el.id}`
                }
            ]
        })

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
            ],
            [{
                text: `${ctx.i18n.t('CartMenuBack')}`,
                callback_data: `cartMenuBack`
            }],
            [{
                text: `${ctx.i18n.t('mainMenuBack')}`,
                callback_data: `mainMenuBack`
            }]
        ];

        const nextMenu = [{text: '▶️', callback_data: 'Next'}];

        const nextAndPreviousMenu = [{text: '◀️', callback_data: 'Previous'}, {text: '▶️', callback_data: 'Next'}];
        const previousMenu = [{text: '◀️', callback_data: 'Previous'}]

        const menu1 = [
            ...categoryMarkup,
            nextMenu,
            ...backMenu
        ]

        const menu2 = [
            ...categoryMarkup,
            nextAndPreviousMenu,
            ...backMenu
        ]

        const menu3 = [
            ...categoryMarkup,
            previousMenu,
            ...backMenu
        ]

        const menu4 = [
            ...categoryMarkup,
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

        let message = ctx.i18n.t('CartMenuItems');

        if (ctx.scene.state.start) {
            message = ctx.scene.state.start
        }


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
