const router = require("express").Router();
const PublicController = require("../controller/publicationsController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}),  PublicController.addPubilc);
router.get("/show", passport.authenticate('jwt', {session: false}),  PublicController.getAll);
module.exports=router