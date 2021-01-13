module.exports = function (sequelize, DataTypes) {
    return sequelize.define('locations', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name_ru: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name_uz: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        description_ru: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description_uz: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        latitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        longitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true
    });
}
