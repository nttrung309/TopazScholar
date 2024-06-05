const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  actID: {
    type: String,
    default: function () {
      // Tạo một mongoose.Types.ObjectId và chuyển đổi thành chuỗi
      return new mongoose.Types.ObjectId().toString();
    },
    required: true,
    unique: true,
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
    enum: ["Trực tiếp", "Online"],
  },
  rule: {
    type: String,
  },
  rating: {
    type: Number,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  event: {
    type: Array,
    default: [],
  },
  maxParticipants: {
    type: Number,
    default: 9999,
  },
  registeredParticipants: {
    type: Number,
    default: 0,
  },
  attendedParticipants: {
    type: Number,
  },
  commentsID: {
    type: Array,
    default: [],
  },
  activityStatus: {
    type: String,
    enum: [
      "NotStartYet",
      "TakingPlace",
      "Delaying",
      "Canceled",
      "Finished",
      "Undefined",
    ],
    default: "Undefined",
  },
  registerStatus: {
    type: String,
    enum: ["Available", "Full", "Undefined"],
    default: "Undefined",
  },
  linkJoin: {
    type: String,
  },
  faculty: {
    type: Array,
    default: [],
  },
  participants: {
    type: Array,
    default: [],
  },
  note: {
    type: String,
  },
  isAutoMailed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Activity", activitySchema);
