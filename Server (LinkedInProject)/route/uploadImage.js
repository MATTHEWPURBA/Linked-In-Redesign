const express = require("express");
const upload = require("../config/multer");
const { verifyToken } = require("../helpers/jwt");
const router = express.Router();

router.post(
  "/",
  (req, res, next) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET;

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }

    const decodeToken = verifyToken(token, secret);
    if (!decodeToken) {
      return res.status(403).json({ error: "Invalid token" });
    }

    next();
  },
  upload.single("image"),
  (req, res) => {
    try {
      const fileUrl = req.file.path;
      res.status(200).json({ fileUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error uploading file" });
    }
  }
);

module.exports = router;
