const bcrypt = require("bcrypt");
const {
    AdminUser
} = require('../../bot/src/models');

// (async function () {
//     AdminUser.create({
//         email: "admin@mail.com",
//         password: await bcrypt.hash("123456qwe", 10)
//     })
// })();

const AdminUserResource = {
    resource: AdminUser,
    options: {
        properties: {
            password: {
                isVisible: {
                    list: false, edit: true, filter: false, show: false,
                },
            },
        },
        actions: {
            new: {
                before: async (request) => {
                    if(request.payload.password) {
                        request.payload = {
                            ...request.payload,
                            password: await bcrypt.hash(request.payload.password, 10),
                        }
                    }
                    return request
                },
            }
        }
    }
}

module.exports = {AdminUser, AdminUserResource};