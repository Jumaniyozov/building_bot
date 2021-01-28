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
        description_uz: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description_ru: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photoUrl: {
            type: DataTypes.STRING(255),
            allowNull: true
        },

        discount: {
            type: DataTypes.FLOAT,
            allowNull: true
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
        ]
    });
}
