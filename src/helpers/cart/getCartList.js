const _ = require("lodash");

async function getCartList(ctx) {
    try {
        const {cart} = ctx.session;

        const cartList = _.values(cart);

        let qty = ctx.session.registered.language === 'ru' ? 'шт.' : 'ta';
        const lan = ctx.session.registered.language;

        let msg = `
<b>📝 ${lan === 'ru' ? 'Список товаров в корзине' : `Savatdagi tovarlar ro'yhati`}</b>       
`
        let total = 0;




        cartList.map((el, index) => {
            msg += `
<b>🧾 ${index+1}: ${lan === 'ru' ? (`${el[`name_ru`]}`) : `${el[`name_uz`]}`}</b>
          <b>🛍️ ${lan === 'ru' ? 'Количество' : 'Miqdori'}:</b> ${el.quantity} ${qty}
          <b>🏷️ ${lan === 'ru' ? `Цена за штуку` : `Donasining narxi`}:</b> ${el.price} ${el.discount === 0 ? '' : `(${el.discount}%)`} ${lan === 'ru' ? 'сум' : `so'm`}
`
            if(el.discount !== null) {
                total +=  ((el.price - (el.price * (el.discount / 100))) * el.quantity)
            } else {
                total += el.price*el.quantity
            }
        })

        ctx.session.cartTotal = total;

        msg+= `
<b>💷 ${lan === 'ru' ? `Общий счет: ` : `Umumiy narx: `} ${total} ${lan === 'ru' ? 'сум' : `so'm`}</b>
`

        return msg;

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getCartList;
