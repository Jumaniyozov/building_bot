const {
    User
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const UserResource = {
    resource: User,
    options: {
        navigation: contentNavigation,
    },

};

module.exports = {UserResource, User};