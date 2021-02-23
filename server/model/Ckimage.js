const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CkimageSchema = new Schema(
  {
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Ckimage = mongoose.model("Ckimage", CkimageSchema);
