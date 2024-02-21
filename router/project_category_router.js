const router = require("express").Router();
const Project_Category_Controller = require("../controller/project_categoryController");
const passport = require('../middleware/passport')


router.post("/add", passport.authenticate('jwt', {session: false}),  Project_Category_Controller.AddCategory);
router.get("/show", passport.authenticate('jwt', {session: false}),  Project_Category_Controller.getAll);
module.exports=router