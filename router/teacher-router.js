const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const TeacherController = require("../controller/teacherController");
// eslint-disable-next-line no-undef

router.post("/add",  TeacherController.addTeacher);
router.get("/all", TeacherController.showAll )
router.get("/:id", TeacherController.getById )
router.get("/user/:id", TeacherController.getByUser )
router.put("/:id", TeacherController.UpdateTeacherById)
router.put("/user/:id", TeacherController.UpdateTeacherByUser)
router.delete("/:id", TeacherController.DeleteById)
router.delete("/user/:id", TeacherController.DelByUser)
module.exports=router;