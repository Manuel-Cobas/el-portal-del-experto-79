const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema({
  text: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  publicationId: { type: Schema.Types.ObjectId, ref: "Publication" },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", Comment);
