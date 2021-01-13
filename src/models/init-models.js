const DataTypes = require("sequelize").DataTypes;
const _category = require("./Category.model");
const _contactData = require("./ContactData.model");
const _locations = require("./Locations.model");
const _order = require("./Order.model");
const _order_item = require("./OrderItem.model");
const _product = require("./Product.model");
const _product_category = require("./ProductCategory.model");
const _transaction = require("./Transaction.model");
const _user = require("./User.model");


function initModels(sequelize) {
    const user = _user(sequelize, DataTypes);
    const category = _category(sequelize, DataTypes);
    const contact_data = _contactData(sequelize, DataTypes);
    const locations = _locations(sequelize, DataTypes);
    const product = _product(sequelize, DataTypes);
    const product_category = _product_category(sequelize, DataTypes);
    const order = _order(sequelize, DataTypes);
    const order_item = _order_item(sequelize, DataTypes);
    const transaction = _transaction(sequelize, DataTypes);

    category.belongsToMany(product, {through: product_category, foreignKey: "categoryId", otherKey: "productId"});
    product.belongsToMany(category, {through: product_category, foreignKey: "productId", otherKey: "categoryId"});
    category.belongsTo(category, {foreignKey: "parentId"});
    category.hasMany(category, {foreignKey: "parentId"});
    order.belongsTo(user, {foreignKey: "userId"});
    user.hasMany(order, {foreignKey: "userId"});

    order_item.belongsTo(order, {foreignKey: "orderId"});
    order.hasMany(order_item, {foreignKey: "orderId"});
    order_item.belongsTo(product, {foreignKey: "productId"});
    product.hasMany(order_item, {foreignKey: "productId"});

    product_category.belongsTo(product, {foreignKey: "productId"});
    product.hasMany(product_category, {foreignKey: "productId"});
    product_category.belongsTo(category, {foreignKey: "categoryId"});
    category.hasMany(product_category, {foreignKey: "categoryId"});


    transaction.belongsTo(order, {foreignKey: "orderId"});
    order.hasMany(transaction, {foreignKey: "orderId"});
    transaction.belongsTo(user, {foreignKey: "userId"});
    user.hasMany(transaction, {foreignKey: "userId"});

    // sequelize.sync({ force: true});

    return {
        User: user,
        Category: category,
        ContactData: contact_data,
        Locations: locations,
        Product: product,
        ProductCategory: product_category,
        Order: order,
        OrderItem: order_item,
        Transaction: transaction
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
