module.exports = function (sequelize, DataTypes) {
    return sequelize.define('categories', {
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
        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'categories',
                key: 'id'
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        timestamps: false,
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
                name: "idx_category_parent",
                using: "BTREE",
                fields: [
                    { name: "parentId" },
                ]
            },
        ]
    });
}
