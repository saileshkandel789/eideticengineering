const { spawn } = require('child_process');
const { createWriteStream } = require('fs');

const VideoDetails = require('../model/videoDetail');
// const port = require('../config/default').port;
const Api = require('../config/keys');

const ffmpegPath = 'C:/FFMPEG/ffmpeg.exe';
const width = 256;
const height = 144;

const generateThumbnail = (target, title) => {
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
  let tmpFile = createWriteStream('media/uploads/video_thumbnails/' + title + '.jpg');
  const ffmpeg = spawn(ffmpegPath, [
    '-ss',
    0,
    '-i',
    target,
    '-vf',
    `thumbnail,scale=${width}:${height}`,
    '-qscale:v',
    '2',
    '-frames:v',
    '1',
    '-f',
    'image2',
    '-c:v',
    'mjpeg',
    'pipe:1'
  ]);
  ffmpeg.stdout.pipe(tmpFile);
  const videoDetails = new VideoDetails({
    upload_title: title,
    video_path: target,
    thumbnail_path: 'http://localhost:4000/api/videos/video_thumbnails/' + encodeURIComponent(title + '.jpg')
  });
  videoDetails
    .save()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = {
  generateThumbnail: generateThumbnail
}