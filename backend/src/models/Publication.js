const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publication = new Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  Date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Publication", Publication);
