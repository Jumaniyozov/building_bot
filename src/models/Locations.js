const MySQL = require('../helpers/mysqlUtils.js');
const Sequelize = require('sequelize');

const Locations = MySQL.define('locations', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nameRu: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptionRu: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    nameUz: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descriptionUz: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    location: {
        type: Sequelize.STRING,
        allowNull: true
    },
    latitude: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    longitude: {
        type: Sequelize.FLOAT,
        allowNull: true
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// Locations.sync({force: true});

module.exports = Locations;
