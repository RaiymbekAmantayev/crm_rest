const db = require("../models");
const Dep = db.departments; // Убедитесь, что имя модели совпадает с именем в вашей базе данных

const addDep = async (req, res) => {
    let info = {
        title: req.body.title,
        description: req.body.description
    };
    try {
        const dep = await Dep.create(info);
        res.status(200).send(dep);
        console.log(dep);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании роли");
    }
};

const showDep = async (req, res)=> {
    const dep = await Dep.findAll()
    res.send(dep)
}

// const ShowDep = async (req, res)=>{
//     const user = req.user
//     const dep = await Dep.findOne({ })
// }

module.exports = {
    addDep,
    showDep
};
