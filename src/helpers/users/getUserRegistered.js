const _ = require("lodash");
const {User} = require("../../models");

async function getUserRegistered(id) {
    try {

        const user = await User.findOne({where: {userId: id, registered: 1}});

        return !_.isEmpty(user) ? user.dataValues : {};
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = getUserRegistered;
