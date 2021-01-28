const {
    Category
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const CategoryResource = {
    resource: Category,
    options: {
        navigation: contentNavigation,
    }
};

module.exports = {CategoryResource, Category};