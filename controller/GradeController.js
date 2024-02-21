const db = require("../models");
const Department = db.departments;
const User = db.users
const Grade = db.grades;
const Position = db.position
const AddGrade = async (req, res) => {
    const user = req.user
    const department = await User.findByPk(user.id)
    const departmentId = department.id
    let info = {
        title: req.body.title,
        hasPhd: req.body.hasPhd,
        experience: req.body.experience,
        min_count_article: req.body.min_count_article,
        min_count_projects: req.body.min_count_projects,
        min_count_sertificates: req.body.min_count_sertificates,
        min_count_seminar: req.body.min_count_seminar,
        min_count_monography: req.body.min_count_monography,
        points: req.body.points,
        positionId :req.body.positionId,
        departmentId: departmentId
    };
    console.log("req.body.title:", req.body.title);
    const isExists = await Grade.findOne({ where: { title: info.title, positionId: info.positionId, departmentId: departmentId } });

    try {
        if(isExists){
            res.send("grade already exists")
        }else{
            const grade = await Grade.create(info);
            res.status(200).send( grade);
            console.log( grade);
        }

    } catch (error) {
        console.error(error);
        // res.status(500).send("Ошибка при создании"
    }
};

const GetAll= async (req, res)=>{
    const departmentId = req.user.departmentId
    try {
        const grades = await Grade.findAll({
            include: [{
                model: Position,
                as: 'position'
            },], where:{
                departmentId: departmentId
            }})
        res.send(grades)
    }catch (e){
        console.log(e)
        res.status(500).send(e)
    }
}

module.exports={
    AddGrade,
    GetAll
}