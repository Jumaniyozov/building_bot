const _ = require("lodash");
const {Product, ProductCategory} = require("../../models");

async function getProducts(categoryId) {
    try {
        const data = await ProductCategory.findAll({where: {categoryId}, include: Product});

        if (!_.isEmpty(data)) {
            return data.map(el => el.dataValues.product.dataValues)
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getProducts;
