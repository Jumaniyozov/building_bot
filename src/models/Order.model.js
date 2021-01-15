const {Sequelize} = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('orders', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        subtotal: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        FIO: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        geoLocation: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        receiveDateStart: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        receiveDateEnd: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        paymentType: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        'created_at': {
            type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3)'
        },
        'updated_at': {
            type: 'DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'
        }
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "id" },
                ]
            },
            {
                name: "idx_order_user",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    });
}
