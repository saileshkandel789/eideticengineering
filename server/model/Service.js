const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const counter = require("./CounterSchema")

const ServiceSchema = new Schema(
  { 
  // service_id: { type: Number, required: false },

    title: {
      type: String,
    },
    short_description: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    }
  },
  { timestamps: true }
);

// ServiceSchema.pre('save', function (next) {
//   var doc = this;
//   counter.findByIdAndUpdate({ _id: '_id' }, { $inc: { seq: 1 } }, { new: true, upsert: true }, function (error, counter) {
//     if (error) return next(error);
//     doc.title = (counter && counter.seq) || 1;
//     next();
//   });
// });
module.exports = Service = mongoose.model("service", ServiceSchema);
