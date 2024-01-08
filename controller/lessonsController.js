const db = require("../models");
const Lesson = db.lessons; // Убедитесь, что имя модели совпадает с именем в вашей базе данных
const Dep = db.departments
const addLesson = async (req, res) => {
    let info = {
        title: req.body.title,
        credit_count: req.body.credit_count,
        description: req.body.description,
        departmentId: req.body.departmentId
    };
    try {
        const lesson = await Lesson.create(info);
        res.status(200).send(lesson);
        console.log(lesson);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании дисциплины");
    }
};

const showAll = async (req, res)=>{
    try{
        const lessons = await Lesson.findAll({
            include:[
                {
                    model: Dep,
                    as: 'department'
                }
            ]
        })
        res.status(200).send(lessons)
    }catch(err){
        res.send(err)
    }

}
const getById = async (req, res)=>{
    const id = req.params.id;
    try{
        const lesson = await Lesson.findByPk(id,{
            include:[
                {
                    model: Dep,
                    as: 'department'
                }
            ]
        })
        if(lesson){
            res.send(lesson)
        }
        res.send("lesson not found")
    }catch(err){
        console.log(err)
    }
}

const UpdateLesson = async (req, res)=>{
    const id = req.params.id;
    let info = {
        title: req.body.title,
        credit_count: req.body.credit_count,
        description: req.body.description,
        departmentId: req.body.departmentId
    };
    try{
        const lesson = await Lesson.update(info,{where:{id:id}})
        res.send(lesson)
    }catch (err){
        console.log(err)
    }
}
const Delete = async (req, res)=>{
    try{
        const id = req.params.id;
        await Lesson.destroy({ where: { id: id } });
        res.send("lesson deleted successfully")
    }catch (err){
       console.log(err)
    }
}

module.exports = {
    addLesson,
    showAll,
    getById,
    UpdateLesson,
    Delete
};