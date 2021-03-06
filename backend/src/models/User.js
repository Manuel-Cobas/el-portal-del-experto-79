const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  first_name: String,
  last_name: String,
  nick: String,
  role: String,
  email: String,
  password: String,
  hour_key: String,
  avatar: String,
});

module.exports = mongoose.model("User", User);
