const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Publication = new Schema({
  title: String,
  description: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  image: String,
});

module.exports = mongoose.model("Publication", Publication);
