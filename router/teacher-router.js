const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const TeacherController = require("../controller/teacherController");
// eslint-disable-next-line no-undef
const passport = require('../middleware/passport')


router.post("/add", passport.authenticate('jwt', {session: false}),   TeacherController.addTeacher);
router.get("/all", passport.authenticate('jwt', {session: false}),   TeacherController.showAll )
router.get("/user/:id", TeacherController.getById )
router.get("/current/user", passport.authenticate('jwt', {session: false}), TeacherController.getByCurrentUser )
router.get("/get/:id", passport.authenticate('jwt', {session: false}), TeacherController.getByUser )
router.put("/:id", passport.authenticate('jwt', {session: false}),  TeacherController.UpdateTeacherById)
router.put("/user/:id", passport.authenticate('jwt', {session: false}),  TeacherController.UpdateTeacherByUser)
router.delete("/:id", passport.authenticate('jwt', {session: false}),  TeacherController.DeleteById)
router.delete("/user/:id", passport.authenticate('jwt', {session: false}),  TeacherController.DelByUser)
module.exports=router;