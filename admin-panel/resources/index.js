const {AdminUser, AdminUserResource} = require('./AdminUser.resource');
const {Product, ProductResource} = require('./Product.resource');
const {Order, OrderResource} = require('./Order.resource');
const {Actions, ActionResource} = require('./Actions.resource');
const {Category, CategoryResource} = require('./Category.resource');
const {ContactData, ContactDataResource} = require('./ContactData.resource');
const {Locations, LocationsResource} = require('./Locations.resource');
const {OrderItem, OrderItemResource} = require('./OrderItem.resource');
const {ProductCategory, ProductCategoryResource} = require('./ProductCategory.resource');
const {Questions, QuestionsResource} = require('./Questions.resource');
const {UserResource, User} = require('./Users.resource');

module.exports = {
    AdminUser, AdminUserResource,
    Product, ProductResource,
    Actions, ActionResource,
    Category, CategoryResource,
    ContactData, ContactDataResource,
    Locations, LocationsResource,
    Order, OrderResource,
    OrderItem, OrderItemResource,
    ProductCategory, ProductCategoryResource,
    Questions, QuestionsResource,
    UserResource, User
};