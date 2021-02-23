const express = require('express');
const router = express.Router();
const {isAuthenticated} = require("../../middleware/isAuthenticated");


const videoController = require("../../controller/Video");


router.post('/',  videoController.addVideo);

router.get('/', videoController.getVideo);
router.post("/:videoId" ,videoController.deleteVideo);


module.exports = router;