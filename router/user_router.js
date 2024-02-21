const router = require("express").Router();
// eslint-disable-next-line no-unused-vars,no-undef
const UserController = require("../controller/userController");
const passport = require('../middleware/passport')
// eslint-disable-next-line no-undef
router.get("/all",passport.authenticate('jwt', {session: false}), UserController.showAll )
router.get("/get/:id", passport.authenticate('jwt', {session: false}), UserController.getById )
router.get("/users",passport.authenticate('jwt', {session: false}), UserController.getJustUsers )
router.get("/current",passport.authenticate('jwt', {session: false}), UserController.CurrentUser )
router.post("/auth",  UserController.Auth);
router.post("/login",  UserController.Login);
router.put("/complement", passport.authenticate('jwt', {session: false}), UserController.Complement);
router.put("/role/:id", passport.authenticate('jwt', {session: false}), UserController.Role);
router.put("/dep/:id", passport.authenticate('jwt', {session: false}), UserController.Department);
router.delete("/:id", passport.authenticate('jwt', {session: false}),UserController.getRole, UserController.Delete);
module.exports=router;