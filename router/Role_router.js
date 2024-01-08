const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const RoleController = require("../controller/roleController");
// eslint-disable-next-line no-undef

router.post("/add",  RoleController.AddRole);
router.get("/show",  RoleController.showRoles);
module.exports=router;