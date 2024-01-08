const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const AchievmentController = require("../controller/achievmentsController");
// eslint-disable-next-line no-undef

router.post("/add",  AchievmentController.addAchievment);
module.exports=router;