const db = require("../models");
const Roles = db.roles; // Убедитесь, что имя модели совпадает с именем в вашей базе данных
const Users = db.users
const Teacher = db.teachers
const {Sequelize} = require("sequelize");
const {Role} = require("./userController");
const sequelize = require("sequelize");

const AddRole = async (req, res) => {
    let info = {
        value: req.body.value,
        description: req.body.description
    };
    try {
        const role = await Roles.create(info);
        res.status(200).send(role);
        console.log(role);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании роли");
    }
};

const showRoles = async (req, res)=> {
    const roles = await Roles.findAll()
    res.send(roles)
}




const JustTeacher = async (req, res) => {
    try {
        const user = req.user;
        const teacherwhichNotinTable = await Users.findAll({
            where: {
                roleId: 4,
                departmentId: user.departmentId,
                id: {
                    [Sequelize.Op.notIn]: sequelize.literal('(SELECT userId FROM teachers WHERE userId IS NOT NULL)')
                }
            }
        });
        res.status(200).json(teacherwhichNotinTable);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const JustAdmin = async (req, res) => {
    try {
        const usersWithoutTeachers = await Users.findAll({
            where: {
                roleId: 1,
                id: {
                    [Sequelize.Op.notIn]: Sequelize.literal('(SELECT userId FROM deans WHERE userId IS NOT NULL)')
                }
            }
        });

        res.status(200).json(usersWithoutTeachers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// const OnlyTeachers = async (req, res)=>{
//     try{
//         const teachers = await Users.findAll({
//             where:{
//                 roleId:4
//             },
//         })
//     }catch (e){
//         res.status(500).send("bad request")
//     }
// }

const getUserByRole = async (req,res)=>{
    try{
        const roleId = req.query.roleId
        const users = await Users.findAll({
            where:{
                roleId:roleId
            }
        })
        res.send(users)
    }catch (e){
        console.log(e)
    }
}


const getUserByRoleDepartment = async (req,res)=>{
    try{
        const roleId = req.query.roleId
        const departmentId = req.user.departmentId
        const users = await Users.findAll({
            where:{
                roleId:roleId,
                departmentId: departmentId
            }
        })
        res.send(users)
    }catch (e){
        console.log(e)
    }
}
const getUserByDepartment = async (req, res)=>{
    try{
        const departmentId = req.query.departmentId
        const users = await Users.findAll({
            where:{
                departmentId:departmentId
            }
        })
        res.send(users)
    }catch (e){
        console.log(e)
    }
}

module.exports = {
    AddRole,
    showRoles,
    JustTeacher,
    JustAdmin,
    getUserByRole,
    getUserByDepartment,
    getUserByRoleDepartment
};
