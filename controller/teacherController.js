const db = require("../models");
const Teachers = db.teachers
const Dep = db.departments
const Users = db.users
const Roles = db.roles
const Achievment = db.achivments


const addTeacher = async (req, res)=>{
    const { userId, salary,  departmentId, achivmentsId } = req.body;
    const teacherAchiv = await Teachers.findOne({where:{id:achivmentsId}})
    const user = await Users.findByPk(req.body.userId, {
        include: [
            {
                model: Roles,
                as: 'role'
            }
        ]
    })
    const teacher = await Teachers.findOne({where:{userId:userId}})
    try{
        if(!teacherAchiv && !teacher && user && user.roleId == 4 ){
            let info = {
                userId,
                salary,
                departmentId,
                achivmentsId,
            };
            const teachers = await Teachers.create(info);
            res.status(200).send(teachers)
        }
        res.send("something goes wrong")
    }catch (err){
        console.log(err)
    }
}

const showAll = async (req, res)=>{
    try{
        const teacher = await Teachers.findAll({
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Dep,
                    as: 'department'
                },
                {
                    model: Achievment,
                    as: 'achivments'
                }
            ]
        })
        res.send(teacher)
    }catch (err){
        res.send(err)
    }

}

const getById = async (req, res)=>{
    const id = req.params.id
    try{
        const teacher = await Teachers.findByPk(id,{
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Dep,
                    as: 'department'
                },
                {
                    model: Achievment,
                    as: 'achivments'
                }
            ]
        })
        res.send(teacher)
    }catch (err){
        console.log(err)
    }
}
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
                    model: Dep,
                    as: 'department'
                },
                {
                    model: Achievment,
                    as: 'achivments'
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
            departmentId,
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
            departmentId
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
    UpdateTeacherByUser,
    UpdateTeacherById,
    DeleteById,
    DelByUser
}