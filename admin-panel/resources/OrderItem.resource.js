const {
    OrderItem
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const OrderItemResource = {
    resource: OrderItem,
    options: {
        navigation: contentNavigation,
    }
};

module.exports = {OrderItemResource, OrderItem};