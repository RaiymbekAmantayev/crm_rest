const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const CrnController = require("../controller/CrnController");


router.post("/add", CrnController.addCRN)
router.get("/all", CrnController.showAll)
router.get("/:id", CrnController.getByID)
router.put("/:id", CrnController.Update)
router.delete("/:id", CrnController.Delete)
module.exports=router;