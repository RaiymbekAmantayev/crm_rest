const router = require("express").Router();
const SertificController = require("../controller/sertificatesController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}),  SertificController.upload, SertificController.AddSertificates);
router.get("/show", passport.authenticate('jwt', {session: false}),  SertificController.getAllByUser);
router.get("/all", SertificController.getAll)
router.put("/change", passport.authenticate('jwt', {session: false}),  SertificController.changeStatus);
router.delete("/del/:id", passport.authenticate('jwt', {session: false}),  SertificController.DeleteById);

module.exports=router