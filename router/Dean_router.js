const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const DeanController = require("../controller/deanController");
const passport = require('../middleware/passport')
// eslint-disable-next-line no-undef
router.post("/add",passport.authenticate('jwt', {session: false}), DeanController.addDean )
router.get("/all",passport.authenticate('jwt', {session: false}), DeanController.showAll )
router.get("/getId/:id",passport.authenticate('jwt', {session: false}), DeanController.getById )
router.get("/user/:id",passport.authenticate('jwt', {session: false}), DeanController.getByUser )
router.put('/edit/:id',passport.authenticate('jwt', {session: false}), DeanController.Update)
router.delete('/:id',passport.authenticate('jwt', {session: false}), DeanController.DelById)
router.delete('/user/:id',passport.authenticate('jwt', {session: false}), DeanController.DelByUser)

module.exports=router;