const MySQL = require('../helpers/mysqlUtils.js')
const Sequelize = require('sequelize');

const User = MySQL.define('users', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userID: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    language: {
        type: Sequelize.STRING,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
});

User.sync({force: true});

module.exports = User;
