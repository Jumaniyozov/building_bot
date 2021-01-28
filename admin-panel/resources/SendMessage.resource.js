const path = require("path");
const sendMessages = async ctx => {
    const filePath = path.resolve(__dirname, '../documents/цены.xlsx', )

    let users = await User.findAll({
        where: {
            status: [3,2]
        }
    })


    ctx.reply(ctx.i18n.t('sendMessageStarted'))

    let bulk = setInterval(() => {
        if (users.length === 0) {
            ctx.reply(ctx.i18n.t('sendMessageStopped'))
            return clearInterval(bulk);
        }
        users.splice(0, 20).forEach(async (e) => {
            await ctx.telegram.sendDocument(e.user_id, {
                source: fs.readFileSync(filePath),
                filename: 'цены.xlsx'
            }, {caption: i18n.t(e.language, 'sendMessagePriceChanged')})
        })
    }, 1500)

    ctx.session.mesage_filter.forEach(msg => {
        ctx.deleteMessage(msg)
    })
}