const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Ping = new Schema({
  issuingUserId: { type: Schema.Types.ObjectId, ref: "User" },
  receivingUserId: { type: Schema.Types.ObjectId, ref: "User" },
  commentId: { type: Schema.Types.ObjectId, ref: "Comment" },
  publicationId: { type: Schema.Types.ObjectId, ref: "Publication" },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ping", Ping);
