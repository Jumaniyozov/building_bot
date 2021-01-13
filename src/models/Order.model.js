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
        receiveDate: {
            type: DataTypes.DATE,
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
    }, {
        sequelize,
        timestamps: true,
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
