module.exports = function (sequelize, DataTypes) {
    return sequelize.define('question', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING
        },
        message_id: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'userId'
            }
        },
        message_status: {
            type: DataTypes.STRING
        },
        question: {
            type: DataTypes.TEXT

        },
        answer: {
            type: DataTypes.TEXT
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
                name: "idx_qstn_user",
                using: "BTREE",
                fields: [
                    { name: "userId" },
                ]
            },
        ]
    })
};
