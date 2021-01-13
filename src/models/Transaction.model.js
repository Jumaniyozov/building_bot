const {Sequelize} = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('transactions', {
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
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
                key: 'id'
            }
        },
        status: {
            type: DataTypes.FLOAT
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
                name: "idx_transaction_user",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
            {
                name: "idx_transaction_order",
                using: "BTREE",
                fields: [
                    { name: "orderId" },
                ]
            },
        ]
    });
}
