const {
    Actions
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const ActionResource = {
    resource: Actions,
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
        listProperties: ['name_ru', 'status', 'active_to'],

    }
};

module.exports = {Actions, ActionResource};