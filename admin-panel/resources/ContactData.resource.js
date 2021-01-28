const {
    ContactData
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const ContactDataResource = {
    resource: ContactData,
    options: {
        navigation: contentNavigation,
    }
};

module.exports = {ContactDataResource, ContactData};