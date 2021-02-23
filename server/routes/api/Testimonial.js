const express = require("express");
const router = express.Router();

const testimonialController = require("../../controller/Testimonial");
const multer = require("multer");
const {isAuthenticated} = require("../../middleware/isAuthenticated");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    // cb(null, new Date().toISOString() + file.originalname);
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/", upload.single("image"), testimonialController.addTestimonial);

router.get("/", testimonialController.getTestimonials);

router.get("/:testimonialId", testimonialController.getTestimonial);

router.post("/:testimonialId", testimonialController.deleteTestimonial);

module.exports = router;
