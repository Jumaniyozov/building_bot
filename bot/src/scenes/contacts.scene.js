const Scene = require("telegraf/scenes/base");
const {getContacts, cleanMessages} = require("../helpers");
const _ = require('lodash');

module.exports = (bot, I18n) => {
    const contactScene = new Scene("contacts");


    contactScene.enter(async (ctx) => {
        await cleanMessages(ctx);

        let message = await getContacts();

        if (_.isEmpty(message)) {
            return ctx.scene.enter('mainMenu', {
                start: ctx.i18n.t('contactsMenuSocialsEmpty')
            })

        } else {

            let msge = `
${message.phoneNumbers}

${message.socials}
            `

            return ctx.scene.enter('mainMenu', {
                start: msge
            })

        }
    });


    return contactScene;
};
