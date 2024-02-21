const router = require("express").Router();
const RoleController = require("../controller/roleController");
const passport = require('../middleware/passport')

router.post("/add",  RoleController.AddRole);
router.get("/show",  RoleController.showRoles);
router.get("/teach",passport.authenticate('jwt', {session: false}),  RoleController.JustTeacher)
router.get("/roleDep",passport.authenticate('jwt', {session: false}),  RoleController.getUserByRoleDepartment)
router.get("/search", RoleController.getUserByRole)
router.get("/dep", RoleController.getUserByDepartment)
router.get("/admin", RoleController.JustAdmin)

module.exports=router;