const sendLocations = require('./locations/sendLocations');
const getContacts = require('./contacts/getContacts');
const getLocations = require('./locations/getLocations');
const getUser = require('./users/getUser');
const cleanMessages = require('./cleaner');
const getCategories = require('./categories/getCategories');
const sendCategories = require('./categories/sendCategories');
const getSubCategories = require('./categories/getSubCategories');
const sendSubCategories = require('./categories/sendSubCategories');
const getProduct = require('./products/getProduct');
const getProducts = require('./products/getProducts');
const sendProducts = require('./products/sendProducts');
const sendCart = require('./cart/sendCart');
const getCartList = require('./cart/getCartList');
const getMyOrders = require('./orders/getMyOrders');
const sendMyOrders = require('./orders/sendMyOrders');
const sendActions = require('./actions/actions');
const sendSearchResults = require('./search/sendSearchResults');
const getUserRegistered = require('./users/getUserRegistered');
const inlineQueryHandler = require('./queryHandler');
const groupStatusHandler = require('./groupStatusHandler');
const qaHandler = require('./qaHandler');
const calendar = require('./calendar');


module.exports = {
    sendLocations,
    getContacts,
    getLocations,
    getUser,
    cleanMessages,
    getCategories,
    sendCategories,
    getSubCategories,
    sendSubCategories,
    getProduct,
    getProducts,
    sendProducts,
    sendCart,
    getCartList,
    getMyOrders,
    sendMyOrders,
    sendActions,
    sendSearchResults,
    getUserRegistered,
    inlineQueryHandler,
    groupStatusHandler,
    qaHandler,
    calendar
}
