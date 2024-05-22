const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  msgID: {
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
  },
  recvID: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
    enum: ['text', 'image']
  },
  sendTime: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model('Message', messageSchema);
