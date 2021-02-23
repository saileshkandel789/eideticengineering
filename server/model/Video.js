const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    title: {
        type:String,
    },
    url: {
        type: String,
    }
}, { timestamps: true })

module.exports = Video = mongoose.model("Video", videoSchema);


