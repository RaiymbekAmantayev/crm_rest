const router = require("express").Router();
const OrganizeController = require("../controller/organizationController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}), OrganizeController.addOrganization);
router.get("/show", passport.authenticate('jwt', {session: false}),  OrganizeController.getAll);

module.exports=router