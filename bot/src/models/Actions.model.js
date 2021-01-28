module.exports = function (sequelize, DataTypes) {
    return sequelize.define('actions', {
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
            allowNull: false
        },
        description_ru: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        active_from: {
            type: DataTypes.DATE,
            allowNull: false
        },
        active_to: {
            type: DataTypes.DATE,
            allowNull: false
        },
        photoUrl: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(255),
            allowNull: false,
            defaultValue: 'Активен'
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
            }
        ]
    });
}
