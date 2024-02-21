const db = require("../models");
const Category = db.category
const AddCategory = async (req, res) => {
    let info = {
        title: req.body.title
    };
    try {
        const category = await Category.create(info);
        res.status(200).send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании категории");
    }
};

const showCategory = async (req, res)=> {
    const category = await Category.findAll()
    res.send(category)
}

module.exports = {
    AddCategory,
    showCategory
}