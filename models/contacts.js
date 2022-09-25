const mongoose = require('mongoose');

const contactsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    favoriteColor: {
        type: String,
        required: true
    },
    birthDay: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('contacts', contactsSchema)