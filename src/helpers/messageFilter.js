module.exports = async (ctx, msg) => {
    try {
        ctx.session.message_filter.push((await msg).message_id);
        return
    } catch (e) {
        console.error(e.message);
        return
    }
}
