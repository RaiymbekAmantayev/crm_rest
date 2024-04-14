const db = require("../models");
const Achievments= db.achivments;
const Articles = db.articles
const Sertificates = db.sertificates
const { Sequelize } = require('sequelize');
const sequelize = require("sequelize");
const Projects = db.projects
const Teachers = db.teachers
const Grade = db.grades
const Users = db.users
const Position = db.position
const addAchievment = async (req, res) => {
    const userId = req.user.id;
    const user = await Users.findByPk(userId)
    const articles = await Articles.findAll({where:{userId:userId, status:1}})
    const count_of_articles = articles.length
    const sertificates = await Sertificates.findAll({ where: { userId: userId,status:1 } });
    const count_of_sertific = sertificates.length
    const projects = await Projects.findAll({ where: { userId: userId, categoryId: 1,status:1 } });
    const monography = await Projects.findAll({where:{userId:userId, categoryId: 2,status:1}})
    const seminar = await Projects.findAll({where:{userId:userId, categoryId: 3,status:1}})
    const count_of_projects = projects.length
    const count_of_monography = monography.length
    const count_of_seminar = seminar.length;
    const teacher = await Teachers.findOne({where:{userId:userId}})
    const current_grade = teacher.current_grade
    const {academic_degree, experience, pretend_grade} = req.body
    const info={
        academic_degree,
        experience,
        count_of_projects,
        count_of_monography,
        count_of_seminar,
        count_of_articles,
        count_of_sertific,
        points: 0,
        status: "new",
        current_grade: current_grade,
        pretend_grade,
        possible_grade: null,
        userId
    }
    const isExists = await Achievments.findOne({where:{userId: req.user.id}})
    console.log(req.user.id)
    if(isExists){
        return res.send(isExists)
    }
    if(user.roleId == 4 && !isExists){
        const achievment = await Achievments.create(info);
        return res.send(achievment)
    }else{
        return res.send("wrong query")
    }

};



const colculatingAchievment = async ()=>{
    const achivements = await Achievments.findAll({
        where: {
            status: {
                [Sequelize.Op.or]: ['edited', 'new']
            }
        }
    });
    if(achivements.length === 0){
        console.log("achievements while not found")
        return
    }
    for (const achievment of achivements){
        const userId = achievment.userId
        const user = await Users.findByPk(userId)
        const departmentId = user.departmentId
        const articles = await Articles.findAll({where:{userId:userId, status:1}})
        const count_of_articles = articles.length
        const totalPointsArticles = await Articles.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
            ],
            where: {
                userId: userId,
            }
        });
        const Teacher = await Teachers.findOne({where:{userId:userId}})
        const survey_percent = Teacher.student_survey * 0.1
        console.log(survey_percent)
        const sertificates = await Sertificates.findAll({ where: { userId: userId, status:1 } });
        const totalPointsOfSertific = await Sertificates.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
            ],
            where: {
                userId: userId,
            }
        });

        const count_of_sertific = sertificates.length
        const projects = await Projects.findAll({ where: { userId: userId, categoryId: 1,status:1 } });
        const monography = await Projects.findAll({where:{userId:userId, categoryId: 2, status:1}})
        const seminar = await Projects.findAll({where:{userId:userId, categoryId: 3, status:1}})

        const count_of_projects = projects.length
        const count_of_monography = monography.length
        const count_of_seminar = seminar.length
        const totalPointsOfProjects = await Projects.findOne({
            attributes: [
                [sequelize.fn('SUM', sequelize.col('points')), 'totalPoints']
            ],
            where: {
                userId: userId,
            }
        });
        let hasPhd = 0
        let points = 0
        if(achievment.academic_degree == "phd"){
            points += 15
            hasPhd += 1
        }
        points += survey_percent
        points += parseInt(totalPointsOfSertific.dataValues.totalPoints) + parseInt(totalPointsOfProjects.dataValues.totalPoints) + parseInt(totalPointsArticles.dataValues.totalPoints) ;
        let possibleGradeId = null;
        const grades = await Grade.findAll({where:{departmentId: departmentId}})
        for (const grade of grades){
            if(hasPhd >= grade.hasPhd && achievment.experience >= grade.experience &&
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
        }
        await Teacher.update({ achivmentsId: achievment.id}, { where: { id: Teacher.id }});
        await Achievments.update({count_of_projects:count_of_projects,
            count_of_monography:count_of_monography,
            count_of_seminar:count_of_seminar,
            count_of_articles:count_of_articles,
            count_of_sertific:count_of_sertific,
            possible_grade: possibleGradeId,
            points:points, status: "colculated"},
            {where:{id: achievment.id}})
        console.log("achievment calculated")
    }
}
const startColculating = () => {
    console.log('Запуск процесса обработки расчет...');
    colculatingAchievment();
    setTimeout(startColculating, 15000);
};

startColculating();


const getAllAchievement = async (req, res)=>{
    try{
        const user = req.user
        console.log(user)
        if(user.roleId) {
            const achievments = await Achievments.findAll({
                include: [
                    {
                        model: Users,
                        as: 'user',
                    },
                    {
                        model: Grade,
                        as: 'possible_grades',
                        include: {
                            model: Position,
                            as: 'position'
                        }
                    }
                ]
            })
            console.log(achievments)
            return res.send(achievments)
        }
        return res.send({})
    }catch (e){
        console.error(e)
    }
}

const getAll = async (req, res)=>{
    try{
        const user = req.user
        console.log(user)
        const departmentId = user.departmentId
        const achievments = await Achievments.findAll({
            include:[
                {
                    model:Users,
                    as: 'user',
                    where:{
                        departmentId: departmentId
                    },
                },
                {
                    model:Grade,
                    as: 'possible_grades',
                    include:{
                        model: Position,
                        as: 'position'
                    }
                }
            ]
        })
        console.log(achievments)
        return res.send(achievments)
    }catch (e){
        console.error(e)
    }
}



const getAchievmentByUser = async (req, res) => {
    const teacherId = req.query.userId;
    console.log("Requested teacherId:", teacherId);
    if(!teacherId){
        return res.status(404).send("user not found")
    }
    try {
        const achievement = await Achievments.findOne({
            where: { userId: teacherId },
            include  : [{
                model: Users,
                as: "user"
            },
                {
                    model:Grade,
                    as: 'possible_grades',
                    include:{
                        model: Position,
                        as: 'position'
                    }
                }
            ]


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


const UpdateTeacherGrade = async (req, res) => {
    try {
        const id = req.query.id;

        // Проверяем, что пользователь существует
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Получаем информацию об учителе
        const teacher = await Teachers.findOne({ where: { userId: user.id } });
        if (!teacher) {
            return res.status(404).send("Teacher not found");
        }

        console.log(teacher);

        // Получаем достижения учителя
        const achievement = await Achievments.findByPk(teacher.achivmentsId);
        if (!achievement) {
            return res.status(404).send("Achievement not found for this teacher");
        }

        console.log("pos grade: ",achievement.possible_grade);

        // Обновляем оценку учителя
        const result = await Teachers.update({ gradeId: achievement.possible_grade }, { where: { userId: id } });
        if (result[0] > 0) {
            return res.send("success");
        }

        // Если ни одна строка не была обновлена
        return res.send("No rows were updated");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}






module.exports = {
    addAchievment,
    getAll,
    getAllAchievement,
    getAchievmentByUser,
    UpdateTeacherGrade
}