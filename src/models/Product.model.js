module.exports = function (sequelize, DataTypes) {
    return sequelize.define('products', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_ru: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        name_uz: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
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
            }
        ]
    });
}
