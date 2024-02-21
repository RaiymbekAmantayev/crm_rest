const router = require("express").Router();
const ArticlesController = require("../controller/articleController");
const passport = require('../middleware/passport')

router.post("/add", passport.authenticate('jwt', {session: false}),  ArticlesController.upload.single('file'), ArticlesController.AddArticles);
router.get("/show", passport.authenticate('jwt', {session: false}),  ArticlesController.getByUser);

module.exports=router