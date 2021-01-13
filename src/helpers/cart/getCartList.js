const _ = require("lodash");

async function getCartList(ctx) {
    try {
        const {cart} = ctx.session;

        const cartList = _.values(cart);

        let qty = ctx.session.registered.language === 'ru' ? 'шт.' : 'ta';
        const lan = ctx.session.registered.language;

        let msg = `
${lan === 'ru' ? 'Список товаров в корзине' : `Savatdagi tovarlar ro'yhati`}
        
`
        // '1': {
        //     id: 1,
        //         name_ru: 'перчатки',
        //         name_uz: "qo'lqop",
        //         price: 10000,
        //         quantity: '8',
        //         item_total_price: 80000,
        //         discount: null
        // },

//         const msg = await ctx.reply(`
// ${lan === 'ru' ? 'Товар' : 'Tovar'}: ${product[`name_${lan}`]}
// ${lan === 'ru' ? 'Количество' : 'Miqdori'}: ${product.quantity} ${qty}
// ${lan === 'ru' ? `Цена за штуку` : `Donasining narxi`}: ${product.price} ${lan === 'ru' ? 'сум' : `so'm`}`)

        let total = 0;

        cartList.map((el, index) => {
            msg += `
${index+1}: ${lan === 'ru' ? (`${el[`name_ru`]}`) : `${el[`name_uz`]}`}
          ${lan === 'ru' ? 'Количество' : 'Miqdori'}: ${el.quantity} ${qty}
          ${lan === 'ru' ? `Цена за штуку` : `Donasining narxi`}: ${el.price} ${lan === 'ru' ? 'сум' : `so'm`}
`
            total += el.item_total_price
        })

        ctx.session.cartTotal = total;

        msg+= `
${lan === 'ru' ? `Общий счет: ` : `Umumiy narx: `} ${total}
`

        return msg;

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getCartList;
