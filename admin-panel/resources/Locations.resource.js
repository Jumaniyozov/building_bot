const {
    Locations
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const LocationsResource = {
    resource: Locations,
    options: {
        navigation: contentNavigation,
        listProperties: ['name_ru', 'description_ru', 'location'],


    }
};

module.exports = {LocationsResource, Locations};