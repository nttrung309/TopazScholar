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
        type: String
    },
    phone: {
        type: String,
        require: true,
        default: "Chưa có"
    },
    dob: {
        type: Date,
        require: true,
        default: new Date("12/12/1990")
    },
    createdDate: {
        type: String,
        default: function() {
            return formatDate(new Date());
        }
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
        require: true,
        default: 'student'
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
    },
    active: {
        type: Boolean,
        default: true
    }
});

function formatDate(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

module.exports = mongoose.model("User", userSchema);