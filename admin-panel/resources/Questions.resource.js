const {
    Questions
} = require('../../bot/src/models');

const contentNavigation = {
    name: null,
    icon: null,
}

const QuestionsResource = {
    resource: Questions,
    options: {
        navigation: contentNavigation,

        listProperties: ['username', 'message_status', 'question', 'answer'],

    },
    // username
    // message_status
    // question
    // answer
};

module.exports = {QuestionsResource, Questions};