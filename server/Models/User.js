const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        require: true,
        unique: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    avatar: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    school: {
        type: String,
        require: true
    },
    class: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        require: true
    },
    attendedActivitiesID: {
        type: Array
    },
    favorActivitiesID: {
        type: Array
    },
    commentsID: {
        type: Array
    },
    reviewsID: {
        type: Array
    },
    hostsID: {
        type: Array
    },
    messagesID: {
        type: Array
    },
    notifyID: {
        type: Array
    },
    salt: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model("User", userSchema);