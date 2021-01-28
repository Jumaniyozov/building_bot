const {
    ProductCategory
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const ProductCategoryResource = {
    resource: ProductCategory,
    options: {
        navigation: contentNavigation,
    }
};

module.exports = {ProductCategoryResource, ProductCategory};