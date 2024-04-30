const mongoose = require('mongoose');

const hostSchema = new mongoose.Schema({
  hostID: {
    type: String,
		default: function () {
		// Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
		return new mongoose.Types.ObjectId().toString();
		},
		required: true,
		unique: true
  },
  adminID: {
    type: String,
  },
  actID: {
    type: String
  },
  userID: {
    type: String,
    required: true,
  },
  regDate: {
    type: Date,
    default: Date.now,
  },
  responseTime: {
    type: Date,
  },
  regStatus: {
    type: String,
    enum: ['Approved', 'Denied'],
  },
  denyReason: {
    type: String,
  },
  adminNote: {
    type: String,
  }
});

module.exports = mongoose.model('Host', hostSchema);
