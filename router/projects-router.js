const router = require("express").Router();
const ProjectController = require("../controller/ProjectsController");
const passport = require('../middleware/passport')


router.post("/add", passport.authenticate('jwt', {session: false}),  ProjectController.upload, ProjectController.AddProjects);
router.get("/show", passport.authenticate('jwt', {session: false}),  ProjectController.getAllByUser);
module.exports=router