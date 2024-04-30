const mongoose = require("mongoose");

const attendDetailSchema = new mongoose.Schema({
	attendDetailID: {
		type: String,
		default: function () {
			// Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
			return new mongoose.Types.ObjectId().toString();
		},
		required: true,
		unique: true,
	},
	userID: {
		type: String,
		required: true,
	},
	actID: {
		type: String,
		required: true,
	},
	attendTime: {
		type: Date,
		default: Date.now,
	},
	actStatus: {
		type: String,
		enum: ["Attended", "NotAttended", "Registered", "Cancelled"],
    	default: "Registered"
	},
});

module.exports = mongoose.model("AttendDetail", attendDetailSchema);
