const {Category, Product, ProductCategory} = require("../../models");
const {Op} = require("sequelize");
const _ = require('lodash');

const sendSearchResults = async (ctx, user, offset) => {
    const {query} = ctx.inlineQuery

    try {
        const products = await Product.findAll(
            {
                where: {
                    [Op.or]: [
                        {
                            name_ru: {[Op.substring]: query}
                        },
                        {
                            name_uz: {[Op.substring]: query}
                        }
                    ]
                },
                limit: 5,
                offset: offset
            });

        let results = [];

        const lan = user.language;


        if (!_.isEmpty(products)) {
            for (let product of products) {

                let {dataValues} = product;

                const category = await ProductCategory.findOne({
                    where: {productId: dataValues.id},
                    include: {model: Category}
                });

                let prod = {};
                prod.id = dataValues.id;
                prod.type = 'article';
                prod.title = `${dataValues[`name_${lan}`]}`;
                prod.description = `${dataValues[`description_${lan}`]}`

                let msg = `
08451193-3893-4477-939b-47b9f4780a61
prodId: ${dataValues.id}
`

                prod.thumb_width = 300
                prod.thumb_height = 300
                prod.input_message_content = {"message_text": msg}
                if (!_.isEmpty(dataValues.photoUrl)) {
                    prod.thumb_url = dataValues.photoUrl;
                }

                results.push(prod);
            }
            return results
        } else {
            console.log('no results');
        }
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = sendSearchResults;
