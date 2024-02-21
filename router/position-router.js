const router = require("express").Router();
const PositionController = require("../controller/positionController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}),  PositionController.AddPosition);
router.get("/show", passport.authenticate('jwt', {session: false}),  PositionController.getPositions);
module.exports = router