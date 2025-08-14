const mongoose = require("mongoose");
const { db } = require("../utils/constant");


const connectDB = async () => {
  try {
    await mongoose.connect(db.MONGO_DB_URL);
    console.log("✅ MongoDB Connected" );
  } catch (err) {
    console.error("❌ MongoDB Connection Failed", err);
    process.exit(1);
  }
};

module.exports = connectDB;
