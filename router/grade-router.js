const router = require("express").Router();
const GradeController = require("../controller/GradeController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}),  GradeController.AddGrade);
router.get("/show", passport.authenticate('jwt', {session: false}),  GradeController.GetAll);
module.exports = router