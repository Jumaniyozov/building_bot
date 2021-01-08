cleanMessages = async (ctx) => {
    try {
        if (ctx.session.message_filter && ctx.session.message_filter.length > 0) {
            await ctx.session.message_filter.forEach(msg => {
                return ctx.deleteMessage(msg);
            })
            ctx.session.message_filter.splice(0, ctx.session.message_filter.length);
        }
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = cleanMessages;
