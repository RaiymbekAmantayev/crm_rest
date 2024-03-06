const db = require("../models");
const Teachers = db.teachers
const Dep = db.departments
const Users = db.users
const Position = db.position
const Grade = db.grades
const Achievment = db.achivments


const addTeacher = async (req, res)=>{

    const gradeId= null
    const achivmentsId = null
    const { userId, salary, student_survey } = req.body;
    const currentUser = req.user;
    const user = await Users.findByPk(req.body.userId)
    const teacher = await Teachers.findOne({where:{userId:userId}})
    try{
        if(!teacher && user && user.roleId == 4 && currentUser.roleId == 1 && currentUser.departmentId == user.departmentId){
            let info = {
                userId,
                salary,
                achivmentsId,
                student_survey,
                gradeId
            };
            const teachers = await Teachers.create(info);
            res.status(200).send(teachers)
        }
        res.send("something goes wrong")
    }catch (err){
        console.log(err)
    }
}


const showAll = async (req, res) => {
    const currentUser = req.user.departmentId;
    try {
        const teachers = await Teachers.findAll({
            include: [
                {
                    model: Users,
                    as: 'user',
                    where: {
                        departmentId: currentUser
                    },
                },
                {
                    model: Grade,
                    as: 'grades'
                }

            ]
        });

        res.send(teachers);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

const getPositionById = async (positionId) => {
    try {
        const position = await Position.findByPk(positionId);
        return position;
    } catch (error) {
        console.error('Error fetching position:', error);
        return null;
    }
};

const getById = async (req, res)=>{
    const id = req.params.id
    try{
        const user = await Users.findByPk(id)
        const userId = user.id
        const teacher = await Teachers.findOne({where:{userId:userId},
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Achievment,
                    as: 'achievments'
                },
                {
                    model: Grade,
                    as: 'grades',

                }
            ]
        });
        if (!teacher) {
            return res.status(404).send('User not found');
        }
        const positionId = teacher.grades.positionId;
        const position = await getPositionById(positionId)
        res.json({teacher, position})
    }catch (err){
        console.log(err)
    }
}
const getByCurrentUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const teacher = await Teachers.findOne({
            where: { userId: userId },
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Achievment,
                    as: 'achievments'
                },
                {
                    model: Grade,
                    as: 'grades'
                }
            ]
        });

        if (!teacher) {
            console.log("user not found")
            return res.status(404).send('User not found');
        }

        const positionId = teacher.grades.positionId;
        const position = await getPositionById(positionId);
        res.json({ teacher, position });
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const getByUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await Users.findByPk(id);
        const teacher = await Teachers.findOne({
            where: { userId: user.id },
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Achievment,
                    as: 'achivments'
                },
                {
                    model: Grade,
                    as: 'grades'
                }
            ]
        });
        res.send(teacher);
    } catch (err) {
        console.log(err);
        res.status(500).send('Ошибка сервера');
    }
};
const UpdateTeacherByUser = async (req, res)=>{
    const { salary, departmentId} = req.body;
    const id = req.params.id;
    const teacher = await Teachers.findOne({
        where:{userId:id}
    })
    try{
        let info = {
            salary,
        };
        const teachers = await Teachers.update(info,{
            where:{id:teacher.id}
        });
        res.status(200).send(teachers)
    }catch (err){
        console.log(err)
    }
}

const UpdateTeacherById = async (req, res)=>{
    const { salary, departmentId } = req.body;
    const id = req.params.id;
    try{
        let info = {
            salary,
        };
        const teachers = await Teachers.update(info,{
            where:{id:id}
        });
        res.status(200).send(teachers)
    }catch (err){
        console.log(err)
    }
}

const DeleteById = async (req, res)=>{
    try {
        const id = req.params.id;
        await Teachers.destroy({ where: { id: id } });
        res.send('teacher deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при удалении записи');
    }
};
const DelByUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user =await Users.findByPk(id)
        await Teachers.destroy({ where: { userId: user.id } });
        res.send('teacher deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при удалении записи');
    }
};
module.exports={
    addTeacher,
    showAll,
    getById,
    getByUser,
    getByCurrentUser,
    UpdateTeacherByUser,
    UpdateTeacherById,
    DeleteById,
    DelByUser
}