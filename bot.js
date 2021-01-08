require('dotenv').config()
const {Telegraf}   = require('telegraf');
const path         = require('path');
const I18n         = require('telegraf-i18n');
const MySQLSession = require('telegraf-session-mysql');
const Stage        = require('telegraf/stage');

const i18n = new I18n({
    directory      : path.resolve(__dirname, 'locales'),
    defaultLanguage: 'ru',
    sessionName    : 'session',
    useSession     : true,
    templateData   : {
        pluralize: I18n.pluralize,
        uppercase: (value) => value.toUpperCase()
    }
})

const session = new MySQLSession({
    host    : process.env.DB_HOST,
    user    : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const bot = new Telegraf(process.env.TGTOKEN)

// Scenes
const registrationScene    = require('./src/scenes/registration')(bot, I18n);
const mainScene            = require('./src/scenes/main')(bot, I18n);
const locationsScene = require('./src/scenes/locations')(bot, I18n);
const contactScene        = require('./src/scenes/contacts')(bot, I18n);

const stgs = [registrationScene, mainScene, locationsScene, contactScene];

// Stage
const stage = new Stage();
let   queue = new Map()
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

bot.use(stage.middleware());


bot.start(ctx => {
    ctx.session.message_filter = [];
    ctx.scene.enter('mainMenu')
})


bot.startPolling()
