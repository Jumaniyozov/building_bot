const initModels = require('./init-models');
const sequelize = require('../helpers/mysqlUtils');

const {
    Category,
    ContactData,
    Locations,
    Order,
    OrderItem,
    Product,
    ProductCategory,
    Transaction,
    User
} = initModels(sequelize);

module.exports = {
    Category,
    ContactData,
    Locations,
    Order,
    OrderItem,
    Product,
    ProductCategory,
    Transaction,
    User
}
