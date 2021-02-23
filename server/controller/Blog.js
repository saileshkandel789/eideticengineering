const formidable = require("formidable");
const fs = require("fs");
const blogController = {};
const BlogSch = require("../model/Blog");

blogController.addBlog = async(req, res) => {
  try {
    console.log(req.files, "file");
  let blogs = req.body;
  if (blogs && blogs._id) {
    if (req.files.length > 0) {
      blogs.image = req.files[0].path;
    }
    BlogSch.findByIdAndUpdate(blogs._id, { $set: blogs }, { new: true })
      .then((update) => {
        return res.status(200).json(update);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const blog = new BlogSch({
      title: req.body.title,
      category: req.body.category,
      short_description: req.body.short_description,
      description: req.body.description,
      image: req.files[0].path,
    });
    const new_blog_save = await blog.save();
    return res.json({
      new_blog_save,
      uploaded: true,
      url: `http://3.137.150.211:4000/${req.files[0].path}`,
    });
  }
  }catch(err) {
    res.json(err);
  }
  
};
// blogController.addBlog = (req, res) => {
//   console.log(req.body, "bbbb");
//   let form = new formidable.IncomingForm();
//   form.keepExtensions = true;
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.log("errrrrrrrr");
//       return res.status(400).json({
//         error: "Image could not be uploaded",
//       });
//     }

//     const { title, category, short_description, description } = fields;
//     if (!title || !description || !category || !short_description) {
//       return res.status(400).json({
//         error: "all field should be required",
//       });
//     }

//     let blog = new BlogSch(fields);
//     // product = _.extend(product, fields);

//     // 1kb = 1000b;
//     //  1mb= 1000000b;

//     if (files.image) {
//       // console.log(files.photo);
//       if (files.image.size > 1000000) {
//         return res.status(400).json({
//           error: "Image should be less than 1mb",
//         });
//       }
//       blog.image.data = fs.readFileSync(files.image.path);
//       blog.image.contentType = files.image.type;
//     }
//     blog.save((err, result) => {
//       if (err) {
//         return res.status(400).json({ err });
//       }
//       res.json(result);
//     });
//   });
// };
blogController.getBlogs = async (req, res, next) => {
  try {
    const data = await BlogSch.find();
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};

blogController.getBlog = async (req, res, next) => {
  try {
    const id = req.params.blogId;
    const data = await BlogSch.findOne({
      _id: id,
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};

blogController.deleteBlog = async (req, res, next) => {
  try {
    const id = req.params.blogId;
    const deletedata = await BlogSch.findOneAndDelete({ _id: id });
    return res.json(deletedata);
  } catch (err) {
    res.json(err);
  }
};
module.exports = blogController;
