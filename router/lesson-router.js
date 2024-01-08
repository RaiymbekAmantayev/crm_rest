const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const LessonController = require("../controller/lessonsController");
// eslint-disable-next-line no-undef

router.post("/add",  LessonController.addLesson);
router.get("/show",  LessonController.showAll);
router.get("/:id",  LessonController.getById);
router.put("/:id", LessonController.UpdateLesson);
router.delete("/:id", LessonController.Delete)
module.exports=router;