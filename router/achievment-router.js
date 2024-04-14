const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const AchievmentController = require("../controller/achievmentsController");
// eslint-disable-next-line no-undef
const passport = require('../middleware/passport')
router.post("/add", passport.authenticate('jwt', {session: false}), AchievmentController.addAchievment);
router.get("/all", passport.authenticate('jwt', {session: false}), AchievmentController.getAll);
router.get("/showall", passport.authenticate('jwt', {session: false}), AchievmentController.getAllAchievement);
router.get("/user",  AchievmentController.getAchievmentByUser);
router.put("/update", AchievmentController.UpdateTeacherGrade)
module.exports=router;