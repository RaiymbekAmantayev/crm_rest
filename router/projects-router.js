const router = require("express").Router();
const ProjectController = require("../controller/ProjectsController");
const passport = require('../middleware/passport')


router.post("/add", passport.authenticate('jwt', {session: false}),  ProjectController.upload, ProjectController.AddProjects);
router.get("/show", passport.authenticate('jwt', {session: false}),  ProjectController.getAllByUser);
router.get("/all",   ProjectController.getAll);
router.put("/change", passport.authenticate('jwt', {session: false}),  ProjectController.changeStatus);
router.delete("/del/:id", passport.authenticate('jwt', {session: false}),  ProjectController.DeleteById);
module.exports=router