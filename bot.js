require('dotenv').config()
const {Telegraf} = require('telegraf');
const path = require('path');
const I18n = require('telegraf-i18n');
const MySQLSession = require('telegraf-session-mysql');
const Stage = require('telegraf/stage');
const {getUser} = require("./src/helpers");
// const stage = require('./src/scenes');

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

// const scenes = stage(bot, I18n);


// Scenes
const languageScene = require('./src/scenes/language.scene')(bot, I18n);
const registrationGetScene = require('./src/scenes/registration.scene').registrationGetScene(bot, I18n);
const registrationVerifyScene = require('./src/scenes/registration.scene').registrationVerifyScene(bot, I18n);
const categoriesScene = require('./src/scenes/categories.scene').categoriesScene(bot, I18n);
const categoriesEnterScene = require('./src/scenes/categories.scene').categoriesEnterScene(bot, I18n);
const subCategoriesEnterScene = require('./src/scenes/categories.scene').subCategoriesEnterScene(bot, I18n);
const productsScene = require('./src/scenes/products.scene').productsScene(bot, I18n);
const productAddToCartScene = require('./src/scenes/products.scene').productAddToCartScene(bot, I18n);
const cartEnterScene = require('./src/scenes/cart.scene').cartEnterScene(bot, I18n);
const cartMenuEnterScene = require('./src/scenes/cart.scene').cartMenuEnterScene(bot, I18n);
const orderEnterScene = require('./src/scenes/order.scene').orderEnterScene(bot, I18n);
const orderEnterFIOScene = require('./src/scenes/order.scene').orderEnterFIOScene(bot, I18n);
const orderEnterGEOScene = require('./src/scenes/order.scene').orderEnterGEOScene(bot, I18n);
const orderEnterDATEScene = require('./src/scenes/order.scene').orderEnterDATEScene(bot, I18n);
const orderEnterPayTypeScene = require('./src/scenes/order.scene').orderEnterPayTypeScene(bot, I18n);
const orderEnterConfirmationScene = require('./src/scenes/order.scene').orderEnterConfirmationScene(bot, I18n);
const myOrdersEnterScene = require('./src/scenes/myOrder.scene').myOrdersEnterScene(bot, I18n);
const myOrdersPendingScene = require('./src/scenes/myOrder.scene').myOrdersPendingScene(bot, I18n);
const settingEnterScene = require('./src/scenes/setings.scene').settingsEnterScene(bot, I18n);
const settingsChangePhoneScene = require('./src/scenes/setings.scene').settingsChangePhoneScene(bot, I18n);
const actionsScene = require('./src/scenes/actions.scene').actionsScene(bot, I18n);

const mainScene = require('./src/scenes/main.scene')(bot, I18n);
const locationsScene = require('./src/scenes/locations.scene')(bot, I18n);
const contactScene = require('./src/scenes/contacts.scene')(bot, I18n);

const stgs = [
    registrationVerifyScene, mainScene, locationsScene, contactScene, languageScene,
    registrationGetScene, categoriesEnterScene, subCategoriesEnterScene, categoriesScene,
    productsScene, productAddToCartScene, cartEnterScene, orderEnterScene, orderEnterFIOScene,
    orderEnterFIOScene, orderEnterGEOScene, orderEnterDATEScene, orderEnterPayTypeScene,
    orderEnterConfirmationScene, cartMenuEnterScene, myOrdersEnterScene,
    myOrdersPendingScene, settingEnterScene, settingsChangePhoneScene, actionsScene
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
    // stg.command('start', start);

    stage.register(stg);
})

stage.command('/start', async ctx => {
    // ctx.session.registered = {};
    ctx.session.message_filter = [];
    await getUser(ctx);
})


bot.use(stage.middleware()).catch(error => console.error(error.message));

// bot.use(ctx => console.log(ctx.update.channel_post.sender_chat.id));

bot.startPolling()

