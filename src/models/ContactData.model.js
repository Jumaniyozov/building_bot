module.exports = function (sequelize, DataTypes) {
    return sequelize.define('contactData', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        phoneNumbers: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        socials: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        sequelize,
        timestamps: false,
        freezeTableName: true
    });
}
