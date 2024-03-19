const File = require("../models/File");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { sendNodeMail } = require("../utils/sendMail");

const uploadFile = async (req, res) => {
  try {
    const { file, body } = req;
    password = body.password;
    if (!file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const maxSize = 15 * 1024 * 1024; // 15 MB in bytes
    if (file.size > maxSize) {
      return res
        .status(400)
        .json({ message: "File size exceeds limit (15 MB)" });
    }

    const existingFile = await File.findOne({
      owner: req.user._id,
      name: file.originalname,
    });
    if (existingFile) {
      return res.status(400).json({
        error: "File  already exists",
      });
    }
    const hashedPassword = password.trim().length
      ? await bcrypt.hash(password, 10)
      : null;
    const newFile = await File.create({
      name: file.originalname,
      type: file.originalname.split(".").pop().toLowerCase(),
      size: file.size,
      data: file.buffer,
      owner: req.user._id,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error during file upload:", error);
    return res.status(500).json({ message: "File upload failed" });
  }
};

const getAllFiles = async (req, res) => {
  try {
    const files = await File.find({ owner: req.user._id }).select("-data");
    res.status(200).json({ success: true, files });
  } catch (error) {
    console.error("Error fetching files:", error);
    res.status(500).json({ message: "Error fetching files" });
  }
};

const getFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId).select("-owner -data");
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.json({ file, url: `${process.env.FRONTEND_BASE_URL}/${file._id}` });
  } catch (error) {
    console.error("Error finding file:", error);
    res.status(500).json({ message: "Error finding file" });
  }
};

const sendMail = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const mail = req.body.mail;
    const file = await File.findById(fileId).select("-data -owner");
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    const userId = req.user._id;
    const user = await User.findById(userId).select("email");
    const userEmail = user.email;
    await sendNodeMail(userEmail, mail, file);
    res.status(200).json({ message: "Mail Sent Successfully" });
  } catch (error) {
    console.error("Error  Sending Mail:", error);
    res.status(500).json({ message: "Error  Sending Mail" });
  }
};

const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    if (file.password) {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      const isPasswordCorrect = await bcrypt.compare(password, file.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Incorrect password" });
      }
    }
    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=${file.name}`,
    });
    res.send(file.data);
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Error downloading file" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    const file = await File.findById(fileId).select("_id");
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    await File.findByIdAndDelete(fileId);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    res.status(500).json({ message: "Error deleting file" });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
  downloadFile,
  getFile,
  sendMail,
  deleteFile,
};
