const _ = require("lodash");
const moment = require('moment');
const getOrderItems = require("./getOrderItems");
const {User, Order} = require("../../models");

async function getMyOrders(ctx, variance) {
    try {
        const user = await User.findOne({where: {userId: ctx.from.id}});
        const orderId = await Order.findAll({where: {userId: user.id}});

        const orderList = [];
        if (!_.isEmpty(orderId)) {

            await Promise.all(orderId.map(async (el, index) => {
                const orderItems = await getOrderItems(ctx, el.id);

                orderList.push({
                    order_id: el.id,
                    total: el.total,
                    status: el.status,
                    date: moment(el.created_at).format('l'),
                    orderItems
                })
            }));

            return orderList;
        } else {
            return {};
        }

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getMyOrders;
