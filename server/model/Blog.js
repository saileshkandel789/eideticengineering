const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    short_description: {
      type: String
    },
    description: {
      type: String,
    },
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Blog = mongoose.model("blogs", BlogSchema);
