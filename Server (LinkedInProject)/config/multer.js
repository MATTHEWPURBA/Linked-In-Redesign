const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "LinkedIn",
    format: async (req, file) => "png", // Optional - specify the format of the image
    public_id: (req, file) => Date.now().toString() + "_" + file.originalname,
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
