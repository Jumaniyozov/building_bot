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

const mainScene = require('./src/scenes/main.scene')(bot, I18n);
const locationsScene = require('./src/scenes/locations.scene')(bot, I18n);
const contactScene = require('./src/scenes/contacts.scene')(bot, I18n);

const stgs = [
    registrationVerifyScene, mainScene, locationsScene, contactScene, languageScene,
    registrationGetScene, categoriesEnterScene, subCategoriesEnterScene, categoriesScene
];

// Stage
const stage = new Stage();

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


bot.use(stage.middleware());


bot.startPolling()

