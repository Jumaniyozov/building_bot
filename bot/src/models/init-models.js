const DataTypes = require("sequelize").DataTypes;
const _category = require("./Category.model");
const _contactData = require("./ContactData.model");
const _locations = require("./Locations.model");
const _order = require("./Order.model");
const _order_item = require("./OrderItem.model");
const _product = require("./Product.model");
const _product_category = require("./ProductCategory.model");
const _user = require("./User.model");
const _actions = require("./Actions.model");
const _questions = require("./Question.model");
const _admin_users = require("./AdminUser.model");


function initModels(sequelize) {
    const user = _user(sequelize, DataTypes);
    const category = _category(sequelize, DataTypes);
    const contact_data = _contactData(sequelize, DataTypes);
    const locations = _locations(sequelize, DataTypes);
    const product = _product(sequelize, DataTypes);
    const product_category = _product_category(sequelize, DataTypes);
    const order = _order(sequelize, DataTypes);
    const order_item = _order_item(sequelize, DataTypes);
    const actions  = _actions(sequelize, DataTypes);
    const questions  = _questions(sequelize, DataTypes);
    const admin_users = _admin_users(sequelize, DataTypes);

    category.belongsToMany(product, {through: product_category, foreignKey: "categoryId", otherKey: "productId", onDelete: "CASCADE"});
    product.belongsToMany(category, {through: product_category, foreignKey: "productId", otherKey: "categoryId", onDelete: "CASCADE"});
    category.belongsTo(category, {foreignKey: "parentId", onDelete: "CASCADE"});
    category.hasMany(category, {foreignKey: "parentId"});
    order.belongsTo(user, {foreignKey: "userId", onDelete: "CASCADE"});
    user.hasMany(order, {foreignKey: "userId"});

    questions.belongsTo(user, {foreignKey: "userId", onDelete: "CASCADE"});
    user.hasMany(questions, {foreignKey: "userId"});

    order_item.belongsTo(order, {foreignKey: "orderId", onDelete: "CASCADE"});
    order.hasMany(order_item, {foreignKey: "orderId"});
    order_item.belongsTo(product, {foreignKey: "productId", onDelete: "CASCADE"});
    product.hasMany(order_item, {foreignKey: "productId"});

    product_category.belongsTo(product, {foreignKey: "productId", onDelete: "CASCADE"});
    product.hasMany(product_category, {foreignKey: "productId"});
    product_category.belongsTo(category, {foreignKey: "categoryId", onDelete: "CASCADE"});
    category.hasMany(product_category, {foreignKey: "categoryId"});

    // sequelize.sync({ force: true});
    // actions.sync({force: true});
    // user.sync({force: true});
    // order.sync({force: true});
    // order_item.sync({force: true});
    // transaction.sync({force: true});
    // questions.sync({force: true});
    // admin_users.sync({force: true});

    return {
        AdminUser: admin_users,
        User: user,
        Category: category,
        ContactData: contact_data,
        Locations: locations,
        Product: product,
        ProductCategory: product_category,
        Order: order,
        OrderItem: order_item,
        Actions: actions,
        Questions: questions
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
