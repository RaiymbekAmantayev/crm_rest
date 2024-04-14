const router = require("express").Router();
const LessonController = require("../controller/lessonsController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}),  LessonController.addLesson);
router.get("/show", passport.authenticate('jwt', {session: false}),  LessonController.showAll);
router.get("/lessonAll", passport.authenticate('jwt', {session: false}),  LessonController.lessonAll);
router.get("/:id",  LessonController.getById);
router.put("/:id", LessonController.UpdateLesson);
router.delete("/:id", LessonController.Delete)
module.exports=router;