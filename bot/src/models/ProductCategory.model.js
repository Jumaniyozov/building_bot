
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product_category', {
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    categoryId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'product_category',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "productId" },
          { name: "categoryId" },
        ]
      },
      {
        name: "idx_pc_category",
        using: "BTREE",
        fields: [
          { name: "categoryId" },
        ]
      },
      {
        name: "idx_pc_product",
        using: "BTREE",
        fields: [
          { name: "productId" },
        ]
      },
    ]
  });
};
