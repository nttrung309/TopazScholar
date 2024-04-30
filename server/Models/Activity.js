const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
	actID: {
		type: String,
		default: function () {
		// Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
		return new mongoose.Types.ObjectId().toString();
		},
		required: true,
		unique: true
	},
	hostID: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	lastModified: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		required: true,
	},
	category: {
		type: String,
	},
	address: {
		type: String,
	},
	ggMap: {
		type: String,
	},
	entryFee: {
		type: String,
	},
	topic: {
		type: String,
	},
	mediaContent: {
		images: {
			type: Array,
			default: [],
		},
		videos: {
			type: Array,
			default: [],
		},
	},
	form: {
		type: String,
		enum: ["onl", "off"],
	},
	rule: {
		type: String,
	},
	rating: {
		type: Number,
	},
	time: {
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
	},
	event: {
		type: Array,
		default: [],
	},
	maxParticipants: {
		type: Number,
		default: 9999
	},
	registeredParticipants: {
		type: Number,
		default: 0
	},
	attendedParticipants: {
		type: Number,
	},
	commentsID: {
		type: String,
	},
	activityStatus: {
		type: String,
		enum: [
			"NotApproved",
			"NotStartYet",
			"TakingPlace",
			"Delaying",
			"Canceled",
		],
    default: "NotApproved"
	},
	registerStatus: {
		type: String,
		enum: ["Available", "Full"],
	},
	note: {
		type: String,
	},
});

module.exports = mongoose.model("Activity", activitySchema);
