const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const DepController = require("../controller/departmentController");
// eslint-disable-next-line no-undef

router.post("/add",  DepController.addDep);
router.get("/show",  DepController.showDep);
module.exports=router;