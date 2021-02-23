const ckController = {};
const CkSch = require("../model/Ckimage");

ckController.addCk = async(req, res) => {
  try {
    console.log(req.files, "file");
    const Ck = new CkSch({
      image: req.files[0].path,
    });
    const new_ck_save = await Ck.save();
    return res.json({
        new_ck_save,
      uploaded: true,
      // url: `http://3.137.150.211:4000/${req.files[0].path}`,
      url: `http://localhost:4000/${req.files[0].path}`,

    });
  
  }catch(err) {
    res.json(err);
  }
  
};

module.exports = ckController;