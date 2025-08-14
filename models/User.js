const mongoose = require("mongoose");
const { models } = require("../utils/constant");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "owner"], default: "user" }
}, { timestamps: true });

module.exports = mongoose.model(models.USER, userSchema);
