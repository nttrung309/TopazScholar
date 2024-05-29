const mongoose = require('mongoose');

const notifySchema = new mongoose.Schema({
  notifyID: {
    type: String,
    required: true,
    default: function () {
			// Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
			return new mongoose.Types.ObjectId().toString();
		},
    unique: true,
  },
  senderID: {
    type: String,
    required: true,
    default: "system"
  },
  recvID: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  sendTime: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['NewAct', 'Liked', 'Normal', 'Upcoming'/*... add other types here */],
  },
  header: {
    type: String,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  link: {
    type: String,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Notify', notifySchema);
