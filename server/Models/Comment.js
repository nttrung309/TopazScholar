const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  cmtID: {
    type: String,
    default: function () {
			// Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
			return new mongoose.Types.ObjectId().toString();
		},
    required: true,
    unique: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  revID: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cmtTime: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Comment', commentSchema);
