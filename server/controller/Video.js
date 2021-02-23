const Video = require("../model/Video");
const videoController = {};

videoController.addVideo = async (req, res) => {
    try {
        console.log(req.body,'bo');
      let videos = req.body;
      if (videos && videos._id) {
          console.log('npooooooo');
        Video.findByIdAndUpdate(
          videos._id,
          { $set: videos },
          { new: true }
        )
          .then((update) => {
            return res.status(200).json(update);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
          console.log('yesss');
        const video = new Video({
          title: req.body.title,
          url: req.body.url
        });
        console.log( 'o');
        const new_video_save = await video.save();
        return res.json({
            new_video_save,
          uploaded: true,
        });
      }
    } catch (err) {
      res.json(err);
    }
  };
videoController.deleteVideo = async(req, res) => { 
    try {
        const id = req.params.videoId;
        const deletedata = await Video.findOneAndDelete({ _id: id });
        return res.json(deletedata);
      } catch (err) {
        res.json(err);
      }
}

videoController.getVideo = async(req, res) => { 
    try {
        const data = await Video.find();
        return res.json(data);
      } catch (err) {
        res.json(err);
      }
}
module.exports = videoController;