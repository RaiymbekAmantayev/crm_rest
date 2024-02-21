const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const deanRoleController = require("../controller/deanRoleController");
// eslint-disable-next-line no-undef

router.post("/add",  deanRoleController.AddRole);
router.get("/show",  deanRoleController.showRoles);

module.exports=router;