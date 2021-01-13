const _ = require("lodash");
const {Category} = require("../../models");

async function getSubCategories(parentId) {
    try {
        const data = await Category.findAll({where: {parentId}});

        if (!_.isEmpty(data)) {
            return data.map(el => el.dataValues)
        } else {
            return null;
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getSubCategories;
