const _ = require("lodash");
const {User} = require("../../models");

async function getUser(ctx) {
    try {
        const user = await User.findOne({where: {userId: ctx.from.id}});

        if (_.isEmpty(user)) {
            ctx.session.registered = {};
            ctx.session.cart = {};
            return ctx.scene.enter('language')
        } else if (!_.isEmpty(user)) {
            ctx.session.registered = user;
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('mainMenu')
            })
        } else {
            ctx.session.cart = {};
            return ctx.scene.enter('language');
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getUser;
