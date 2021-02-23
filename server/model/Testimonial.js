const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Testimonial = mongoose.model("Testimonial", TestimonialSchema);
