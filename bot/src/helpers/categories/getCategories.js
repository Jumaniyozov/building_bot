const _ = require("lodash");
const {Category} = require("../../models");

async function getCategories() {
    try {
        const data = await Category.findAll({where: {parentId: null}});

        if (!_.isEmpty(data)) {
            return data.map(el => el.dataValues)
        } else {
            throw new Error("Empty");
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getCategories;
