cleanMessages = async (ctx) => {
    try {
        if (ctx.session.message_filter && ctx.session.message_filter.length > 0) {
            for (const msg of  ctx.session.message_filter) {
               await ctx.deleteMessage(msg);
            }

            ctx.session.message_filter.splice(0, ctx.session.message_filter.length);
        }
    } catch (error) {
        console.error(error);
        return ctx.scene.enter('mainMenu', {
            start: ctx.i18n.t('mainErrorMessage')
        })
    }
}

module.exports = cleanMessages;
