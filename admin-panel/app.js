const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const {language, translations} = require('./locale');
const bot = require('../bot/bot');

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'build_bot',
    schema: {
        tableName: 'admin_sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
};

const sessionStore = new MySQLStore(options);

const {
    AdminUser, QuestionsResource, UserResource,
    ProductCategoryResource, ProductResource,
    ContactDataResource, CategoryResource, OrderItemResource,
    OrderResource, LocationsResource, ActionResource,
} = require('./resources');

AdminBro.registerAdapter(AdminBroSequelize)

const express = require('express')
const bcrypt = require("bcrypt");
const app = express()

const contentNavigation = {
    name: null,
    icon: 'Accessibility',
}

const adminBro = new AdminBro({

    dashboard: {
        handler: async () => {
            return {some: 'output'}
        },
        component: AdminBro.bundle('./dashboard')
    },
    locale: {
        language,
        translations
    },
    rootPath: '/admin',
    resources: [
        QuestionsResource, ProductCategoryResource,
        ProductResource, ContactDataResource,
        CategoryResource, OrderItemResource,
        OrderResource, LocationsResource,
        ActionResource, UserResource
    ],
    branding: {
        companyName: 'Edisson',
        softwareBrothers: false,
        logo: false,
    }
})

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    cookieName: 'admin-bro',
    cookiePassword: '=W#JvmN6BW8<[nV=NM4LQ$f%}9w^-/mj',
    authenticate: async (email, password) => {
        const user = await AdminUser.findOne({where: {email}})
        if (user) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) {
                return user
            }
        }
        return false
    },

}, null, {
    resave: false,
    saveUninitialized: true,
    store: sessionStore
})

app.use(adminBro.options.rootPath, router);

app.listen(8080, () => {
    try {
        bot.startPolling();
        console.log('AdminBro is under localhost:8080/admin')
    } catch (err) {
        console.error(err.message);
    }
})