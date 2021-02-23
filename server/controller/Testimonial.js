
const testimonialController = {};
const TestimonialSch = require("../model/Testimonial");

testimonialController.addTestimonial = (req, res) => {
  // console.log(req.file, "file");
  let testimonials = req.body;
  if (testimonials && testimonials._id) {
    if (req.file) {
        testimonials.image = req.file.path;
    }
    TestimonialSch.findByIdAndUpdate(testimonials._id, { $set: testimonials }, { new: true })
      .then((update) => {
        return res.status(200).json(update);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const testi = new TestimonialSch({
      name: req.body.name,
      description: req.body.description,
      image: req.file.path,
    });
    testi
      .save()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        return res.status(400).json({ err });
      });
  }
};

testimonialController.getTestimonials = async (req, res, next) => {
  try {
    const data = await TestimonialSch.find();
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};

testimonialController.getTestimonial = async (req, res, next) => {
  try {
    const id = req.params.testimonialId;
    const data = await TestimonialSch.findOne({
      _id: id,
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};

testimonialController.deleteTestimonial = async (req, res, next) => {
  try {
    const id = req.params.testimonialId;
    const deletedata = await TestimonialSch.findOneAndDelete({ _id: id });
    return res.json(deletedata);
  } catch (err) {
    res.json(err);
  }
};
module.exports = testimonialController;
