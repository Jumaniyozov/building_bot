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
const _actions = require("./Actions.model");
const _questions = require("./Question.model");


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
    const actions  = _actions(sequelize, DataTypes);
    const questions  = _questions(sequelize, DataTypes);

    category.belongsToMany(product, {through: product_category, foreignKey: "categoryId", otherKey: "productId"});
    product.belongsToMany(category, {through: product_category, foreignKey: "productId", otherKey: "categoryId"});
    category.belongsTo(category, {foreignKey: "parentId"});
    category.hasMany(category, {foreignKey: "parentId",  onDelete: 'cascade'});
    order.belongsTo(user, {foreignKey: "userId"});
    user.hasMany(order, {foreignKey: "userId",  onDelete: 'cascade' });

    questions.belongsTo(user, {foreignKey: "userId"});
    user.hasMany(questions, {foreignKey: "userId",  onDelete: 'cascade' });

    order_item.belongsTo(order, {foreignKey: "orderId"});
    order.hasMany(order_item, {foreignKey: "orderId",  onDelete: 'cascade' });
    order_item.belongsTo(product, {foreignKey: "productId"});
    product.hasMany(order_item, {foreignKey: "productId",  onDelete: 'cascade' });

    product_category.belongsTo(product, {foreignKey: "productId"});
    product.hasMany(product_category, {foreignKey: "productId",  onDelete: 'cascade' });
    product_category.belongsTo(category, {foreignKey: "categoryId"});
    category.hasMany(product_category, {foreignKey: "categoryId",  onDelete: 'cascade' });


    transaction.belongsTo(order, {foreignKey: "orderId"});
    order.hasMany(transaction, {foreignKey: "orderId",  onDelete: 'cascade' });
    transaction.belongsTo(user, {foreignKey: "userId"});
    user.hasMany(transaction, {foreignKey: "userId",  onDelete: 'cascade' });

    // sequelize.sync({ force: true});
    // actions.sync({force: true});
    // user.sync({force: true});
    // order.sync({force: true});
    // order_item.sync({force: true});
    // transaction.sync({force: true});
    // questions.sync({force: true});

    return {
        User: user,
        Category: category,
        ContactData: contact_data,
        Locations: locations,
        Product: product,
        ProductCategory: product_category,
        Order: order,
        OrderItem: order_item,
        Transaction: transaction,
        Actions: actions,
        Questions: questions
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
