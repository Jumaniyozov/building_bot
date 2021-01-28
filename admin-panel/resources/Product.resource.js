const {
    Product
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const ProductResource = {
    resource: Product,
    options: {
        navigation: contentNavigation,
        properties: {
            description_ru: {type: 'textarea'},
            description_uz: {type: 'textarea'},
            created_at: {
                isVisible: { list: false, filter: false, show: false, edit: false },
            },
            updated_at: {
                isVisible: { list: false, filter: false, show: false, edit: false },
            },
        },
        listProperties: ['name_ru', 'description_ru', 'price', 'discount'],

    }
};

module.exports = {Product, ProductResource};