const router = require("express").Router();
const CategoryController = require("../controller/categoryController");
const passport = require('../middleware/passport')

router.post("/add",  CategoryController.AddCategory);
router.get("/show",  CategoryController.showCategory);

module.exports = router