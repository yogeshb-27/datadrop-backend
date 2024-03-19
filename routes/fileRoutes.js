const multer = require("multer");
const {
  uploadFile,
  getAllFiles,
  downloadFile,
  getFile,
  sendMail,
  deleteFile,
} = require("../controllers/fileController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = require("express").Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", authenticateUser, upload.single("file"), uploadFile);
router.post("/download/:fileId", downloadFile);
router.post("/send-mail/:fileId", authenticateUser, sendMail);
router.get("/:fileId", getFile);
router.get("/", authenticateUser, getAllFiles);
router.delete("/delete/:fileId", deleteFile);
module.exports = router;
