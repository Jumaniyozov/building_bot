require('dotenv').config({path: './.env'})
const {Telegraf} = require('telegraf');
const path = require('path');
const I18n = require('telegraf-i18n');
const MySQLSession = require('telegraf-session-mysql');
const Stage = require('telegraf/stage');
const {getUser} = require("./src/helpers");
const _ = require('lodash');
const {groupStatusHandler,
    qaHandler,
    inlineQueryHandler,
    cleanMessages,
    getUserRegistered,
    sendSearchResults} = require("./src/helpers");




const i18n = new I18n({
    directory: path.resolve(__dirname, 'locales'),
    defaultLanguage: 'ru',
    sessionName: 'session',
    useSession: true,
    templateData: {
        pluralize: I18n.pluralize,
        uppercase: (value) => value.toUpperCase()
    }
})

const session = new MySQLSession({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const bot = new Telegraf(process.env.TGTOKEN)


// Scenes
const languageScene = require('./src/scenes/language.scene')(bot, I18n);
const registrationGetScene = require('./src/scenes/registration.scene').registrationGetScene(bot, I18n);
const registrationVerifyScene = require('./src/scenes/registration.scene').registrationVerifyScene(bot, I18n);
const categoriesEnterScene = require('./src/scenes/categories.scene').categoriesEnterScene(bot, I18n);
const subCategoriesEnterScene = require('./src/scenes/categories.scene').subCategoriesEnterScene(bot, I18n);
const productsScene = require('./src/scenes/products.scene').productsScene(bot, I18n);
const productAddToCartScene = require('./src/scenes/products.scene').productAddToCartScene(bot, I18n);
const cartEnterScene = require('./src/scenes/cart.scene').cartEnterScene(bot, I18n);
const orderEnterFIOScene = require('./src/scenes/order.scene').orderEnterFIOScene(bot, I18n);
const orderEnterGEOScene = require('./src/scenes/order.scene').orderEnterGEOScene(bot, I18n);
// const orderEnterDATEScene = require('./src/scenes/order.scene').orderEnterDATEScene(bot, I18n);
const createOrderPeriodScene = require('./src/scenes/order.scene').createOrderPeriodScene(bot, I18n);
const orderEnterPayTypeScene = require('./src/scenes/order.scene').orderEnterPayTypeScene(bot, I18n);
const orderEnterConfirmationScene = require('./src/scenes/order.scene').orderEnterConfirmationScene(bot, I18n);
const myOrdersEnterScene = require('./src/scenes/myOrder.scene').myOrdersEnterScene(bot, I18n);
const myOrdersCompleteScene = require('./src/scenes/myOrder.scene').myOrdersCompleteScene(bot, I18n);
const myOrdersPendingScene = require('./src/scenes/myOrder.scene').myOrdersPendingScene(bot, I18n);
const settingEnterScene = require('./src/scenes/setings.scene').settingsEnterScene(bot, I18n);
const settingsChangePhoneScene = require('./src/scenes/setings.scene').settingsChangePhoneScene(bot, I18n);
const actionsScene = require('./src/scenes/actions.scene').actionsScene(bot, I18n);
const searchScene = require('./src/scenes/search.scene')(bot, I18n);
const askQuestionScene = require('./src/scenes/qa.scene')(bot, I18n);

const mainScene = require('./src/scenes/main.scene')(bot, I18n);
const locationsScene = require('./src/scenes/locations.scene')(bot, I18n);
const contactScene = require('./src/scenes/contacts.scene')(bot, I18n);

const stgs = [
    registrationVerifyScene, mainScene, locationsScene, contactScene, languageScene,
    registrationGetScene, categoriesEnterScene, subCategoriesEnterScene,
    productsScene, productAddToCartScene, cartEnterScene, orderEnterFIOScene,
    orderEnterFIOScene, orderEnterGEOScene, createOrderPeriodScene, orderEnterPayTypeScene,
    orderEnterConfirmationScene, myOrdersEnterScene, searchScene,
    myOrdersPendingScene, settingEnterScene, settingsChangePhoneScene, actionsScene,
    myOrdersCompleteScene, askQuestionScene
];

// Stage
const stage = new Stage();
let queue = new Map()

stage.use((ctx, next) => {
    if (ctx.message && ctx.message.photo) return next()
    let user = queue.get(ctx.from.id)
    if (user) return
    queue.set(ctx.from.id, true)
    return next().then(() => {
        queue.delete(ctx.from.id)
    }).catch(e => {
        console.error(e)
        queue.delete(ctx.from.id)
    })
})

// middlewares
bot.use(session.middleware())
bot.use(i18n.middleware())

stgs.map(stg => {
    stage.register(stg);
})

stage.command('/start', async ctx => {
    await cleanMessages(ctx);
    ctx.session.message_filter = [];
    await getUser(ctx);
})


bot.on('message', async (ctx, next) => inlineQueryHandler(ctx, next, bot));


bot.on('inline_query', async ctx => {

    const user = await getUserRegistered(ctx.update.inline_query.from.id);
    let offset = +ctx.inlineQuery.offset || 0

    if (!_.isEmpty(user)) {
        if (ctx.inlineQuery.query !== '') {
            const results = await sendSearchResults(ctx, user, offset).catch(error => console.error(error.message, error.stack));

            let next_offset = parseInt(offset) + 5
            return ctx.answerInlineQuery(results.filter(e => e), {
                next_offset: next_offset,
                cache_time: 30,
                is_personal: true
            })
        }

    }
    return ctx.answerInlineQuery([]);
});

bot.use(stage.middleware())

bot.use(async ctx => {
    try{

    await qaHandler(ctx, bot);
    await groupStatusHandler(ctx, bot);
    } catch (e) {
        console.error(e.message);
    }
});

bot.catch((e) => {
    console.error(e.message);
})

bot.startPolling()

