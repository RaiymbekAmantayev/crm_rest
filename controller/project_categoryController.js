const db = require("../models/index");
const { Sequelize, DataTypes } = require('sequelize');
const Category = db.project_category;


const AddCategory = async (req, res) => {
    let info = {
        title: req.body.title,
        points: req.body.points
    };

    try {
        const category = await Category.create(info);
        res.status(200).send(category);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании категории");
    }
};


const getAll=async(req, res)=>{
    try{
        const categories = await Category.findAll()
        res.send(categories)
    }catch (e){
        console.log(e)
    }
}

module.exports={
    AddCategory,
    getAll
}
