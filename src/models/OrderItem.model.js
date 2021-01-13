module.exports = function (sequelize, DataTypes) {
    return sequelize.define('orderItems', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        quantity: {
            type: DataTypes.FLOAT
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: {
                    model: 'products',
                    key: 'id'
                }
            }
        },
        orderId: {
            type: DataTypes.INTEGER,
            llowNull: false,
            references: {
                model: {
                    model: 'orders',
                    key: 'id'
                }
            }
        },

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
                name: "idx_order_item_product",
                using: "BTREE",
                fields: [
                    { name: "productId" },
                ]
            },
            {
                name: "idx_order_item_order",
                using: "BTREE",
                fields: [
                    { name: "orderId" },
                ]
            },
        ]
    });
}
