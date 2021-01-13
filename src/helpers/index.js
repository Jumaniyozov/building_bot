const sendLocations = require('./locations/sendLocations');
const getContacts = require('./contacts/getContacts');
const getLocations = require('./locations/getLocations');
const getUser = require('./users/getUser');
const cleanMessages = require('./cleaner');
const getCategories = require('./categories/getCategories');
const sendCategories = require('./categories/sendCategories');
const getSubCategories = require('./categories/getSubCategories');
const sendSubCategories = require('./categories/sendSubCategories');

module.exports = {
    sendLocations,
    getContacts,
    getLocations,
    getUser,
    cleanMessages,
    getCategories,
    sendCategories,
    getSubCategories,
    sendSubCategories
}
