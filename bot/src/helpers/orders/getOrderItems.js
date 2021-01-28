const _ = require("lodash");
const {OrderItem, Product} = require("../../models");

async function getOrderItems(ctx, orderId) {
    try {
        const items = await OrderItem.findAll({where: {orderId}, include: {model: Product}});
        return items.map(el => {
            return {
                ...el.dataValues.product.dataValues,
                item_qty: el.dataValues.quantity
            }
        })
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getOrderItems;
