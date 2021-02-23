const projectController = {};
const ProjectSch = require("../model/Project");

projectController.addProject = async (req, res) => {
  try {
    let projects = req.body;
  if (projects && projects._id) {
    if (req.files.length > 0) {
      const reqFiles = [];
      for (var i = 0; i < req.files.length; i++) {
          reqFiles.push(`${req.files[i].path}`)
      }
      projects.image  = reqFiles;
    }
    const update = await ProjectSch.findByIdAndUpdate(projects._id, { $set: projects }, { new: true })
        return res.status(201).json(update);
     
  }else {

    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(`${req.files[i].path}`)
    }
    const project = new ProjectSch({
      title: req.body.title,
      category: req.body.category,
      location: req.body.location,
      // image: req.file.path,
      image: reqFiles,
      description : req.body.description
    });
    // console.log(req.body.cat, "cat");
    const new_project_save = await project.save();
    return res.json({
      new_project_save,
    });
  }
    // console.log(req, "jff");
   
  } catch (err) {
    res.json(err);
  }
};
projectController.getProjects = async (req, res, next) => {
  try {
    let searchq = {};
    if (req.query.projectCategory) {
      searchq = {
        category: req.query.projectCategory,
        ...searchq,
      };
      // console.log(req.query.projectCategory, "aayyo");
    }
    const data = await ProjectSch.find(searchq);
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};
projectController.getProject = async (req, res, next) => {
  try {
    const id = req.params.projectId;
    const data = await ProjectSch.findOne({
      _id: id,
    });
    return res.json(data);
  } catch (err) {
    res.json(err);
  }
};

projectController.deleteProject = async (req, res, next) => {
  try {
    console.log(req.body,'body')
    const id = req.params.projectId;
    const deletedata = await ProjectSch.findOneAndDelete({ _id: id });
    return res.json(deletedata);
  } catch (err) {
    res.json(err);
  }
};

module.exports = projectController;
