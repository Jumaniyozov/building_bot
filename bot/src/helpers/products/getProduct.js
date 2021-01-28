const _ = require("lodash");
const {Product} = require("../../models");

async function getProduct(productId) {
    try {
        const data = await Product.findByPk(productId);

        if (!_.isEmpty(data)) {
            return data.dataValues;
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getProduct;
