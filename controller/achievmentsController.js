const db = require("../models");
const Achievments= db.achivments;
const Articles = db.articles
const Sertificates = db.sertificates
const sequelize = require("sequelize");
const Projects = db.projects
const Teachers = db.teachers
const Grade = db.grades
const Users = db.users
const addAchievment = async (req, res) => {
    const userId = req.user.id;
    const departmenId = req.user.departmentId
    const user = await Users.findByPk(userId)
    const articles = await Articles.findAll({where:{userId:userId}})
    const count_of_articles = articles.length
    const totalPointsArticles = await Articles.findOne({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
        ],
        where: {
            userId: userId
        }
    });
    const Teacher = await Teachers.findOne({where:{userId:userId}})
    const current_grade = Teacher.gradeId
    const survey_percent = Teacher.student_survey * 0.1
    console.log(survey_percent)
    const sertificates = await Sertificates.findAll({ where: { userId: userId } });
    const totalPointsOfSertific = await Sertificates.findOne({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
        ],
        where: {
            userId: userId
        }
    });

    const count_of_sertific = sertificates.length
    const projects = await Projects.findAll({ where: { userId: userId, categoryId: 1 } });
    const monography = await Projects.findAll({where:{userId:userId, categoryId: 2}})
    const seminar = await Projects.findAll({where:{userId:userId, categoryId: 3}})

    const count_of_projects = projects.length
    const count_of_monography = monography.length
    const count_of_seminar = seminar.length

    const totalPointsOfProjects = await Projects.findOne({
        attributes: [
            [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
        ],
        where: {
            userId: userId
        }
    });

    let points = 0
    let hasPhd = 0
    if (req.body.academic_degree == "phd"){
        points += 15
        hasPhd += 1
    }
    points += survey_percent
    points += parseInt(totalPointsOfSertific.dataValues.totalPoints) + parseInt(totalPointsOfProjects.dataValues.totalPoints) + parseInt(totalPointsArticles.dataValues.totalPoints) ;
    let possibleGradeId = null;
    const grades = await Grade.findAll({where:{departmentId: departmenId}})
    for (const grade of grades){
        if(hasPhd >= grade.hasPhd && req.body.experience >= grade.experience &&
        count_of_articles >= grade.min_count_article &&
        count_of_projects>= grade.min_count_projects &&
        count_of_monography >= grade.min_count_monography &&
        count_of_seminar >=grade.min_count_seminar &&
        count_of_sertific >= grade.min_count_sertificates &&
        points >= grade.points){
            console.log("Пользователь имеет грейд с ID:", grade.id);
            possibleGradeId = grade.id
            break;
        }
        else{
            possibleGradeId = null
        }
    }
    console.log(possibleGradeId)
    const {academic_degree, experience, pretend_grade} = req.body
    const info={
        academic_degree,
        experience,
        count_of_projects,
        count_of_monography,
        count_of_seminar,
        count_of_articles,
        count_of_sertific,
        points,
        current_grade: current_grade,
        pretend_grade,
        possible_grade: possibleGradeId,
        userId
    }
    console.log("totalPointsArticles:", totalPointsArticles);
    console.log("totalPoints:", totalPointsArticles.dataValues.totalPoints);
    if(user.roleId == 4 && Teacher){
        const achievment = await Achievments.create(info);
        await Teacher.update({ achivmentsId: achievment.id, gradeId: possibleGradeId }, { where: { id: Teacher.id }});

        return res.send(achievment)
    }

};


const getAll = async (req, res)=>{
    try{
        const achievments = await Achievments.findAll()
        res.send(achievments)
    }catch (e){
        console.error(e)
    }
}


const getAchievmentByUser = async (req, res) => {
    const teacherId = req.query.teacherId;
    console.log("Requested teacherId:", teacherId);

    try {
        const achievement = await Achievments.findOne({
            where: { teacherId: teacherId },
        });

        console.log("Retrieved achievement:", achievement);

        if (achievement) {
            res.send(achievement);
        } else {
            res.status(404).send("Achievement not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};








module.exports = {
    addAchievment,
    getAll,
    getAchievmentByUser
}