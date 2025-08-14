const mongoose = require("mongoose");
const { models } = require("../utils/constant");

const pgSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  amenities: [{ type: String }],
  gender: { type: String, enum: ["boys", "girls", "any"], default: "any" },
  images: [{ type: String }],
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model(models.PGListing, pgSchema);
