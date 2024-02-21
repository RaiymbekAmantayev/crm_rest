const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const AchievmentController = require("../controller/achievmentsController");
// eslint-disable-next-line no-undef
const passport = require('../middleware/passport')
router.post("/add", passport.authenticate('jwt', {session: false}), AchievmentController.addAchievment);
router.get("/all",  AchievmentController.getAll);
router.get("/user",  AchievmentController.getAchievmentByUser);
module.exports=router;