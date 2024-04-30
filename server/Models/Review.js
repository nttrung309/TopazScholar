const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewID: {
    type: String,
    default: function () {
			// Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
			return new mongoose.Types.ObjectId().toString();
		},
    required: true,
    unique: true,
  },
  reviewerID: {
    type: String,
    required: true,
  },
  actID: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  reviewTime: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Review', reviewSchema);
