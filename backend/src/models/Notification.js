const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Notification = new Schema({
  title: String,
  description: String,
  eventId: String,
  typeEvent:String,
  receivingUserId: { type: Schema.Types.ObjectId, ref: "User" },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Notification", Notification);
