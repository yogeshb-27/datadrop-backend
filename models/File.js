const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  data: { type: Buffer, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  password: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // 86400 seconds = 24 hours
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
