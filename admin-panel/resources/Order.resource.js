const {
    Order
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const OrderResource = {
    resource: Order,
    options: {
        navigation: contentNavigation,
        listProperties: ['userId', 'total', 'FIO','receiveDate', 'paymentType','status'],
    }
};

module.exports = {OrderResource, Order};