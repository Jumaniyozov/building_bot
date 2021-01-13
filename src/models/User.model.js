module.exports = function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        language: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
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
            },
            {
                name: "uq_userId",
                unique: true,
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            }
        ]
    });
}
