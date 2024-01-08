const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const SheduleController = require("../controller/sheduleController");
const passport = require('../middleware/passport')
// eslint-disable-next-line no-undef
router.post("/add",passport.authenticate('jwt', {session: false}), SheduleController.addShedule )
router.get("/all",passport.authenticate('jwt', {session: false}), SheduleController.getAll )
router.get("/:id",passport.authenticate('jwt', {session: false}), SheduleController.getById )
router.get("/teacher/all",passport.authenticate('jwt', {session: false}), SheduleController.getForTeacher )
router.get("/teacher/:id",passport.authenticate('jwt', {session: false}), SheduleController.getIdForTeacher )
router.put("/:id",passport.authenticate('jwt', {session: false}), SheduleController.Update )
module.exports=router;