const MySQL = require('../helpers/mysqlUtils.js');
const Sequelize = require('sequelize');

const ContactData = MySQL.define('contactData', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    phoneNumbers: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    socials: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

// ContactData.sync({force: true});

module.exports = ContactData;
