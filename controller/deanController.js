const db = require("../models");
const Dean = db.deans
const Dep = db.departments
const Users = db.users
const Roles = db.roles

const addDean = async (req, res)=>{
    const { userId, salary, duties, departmentId } = req.body;
    const user = await Users.findByPk(req.body.userId, {
        include: [
            {
                model: Roles,
                as: 'role'
            }
        ]
    })
    const dean = await Dean.findOne({where:{userId:userId}})
    try{
        if(!user || user.roleId == 4 || user.roleId == 2 ){
            res.send('first of change role of user or user not found')
        }
        if(dean){
            res.send("u cant add exists user")
        }
        const roleId = user.roleId
        let info = {
            userId,
            roleId,
            salary,
            duties,
            departmentId
        };
        const deanEmployeer = await Dean.create(info);
        res.status(200).send(deanEmployeer)
    }catch (err){
        res.send(err)
    }
}

const showAll = async (req, res) => {
    try {
        const deans = await Dean.findAll({
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Roles,
                    as: 'role'
                },
                {
                    model: Dep,
                    as: 'department'
                }
            ]
        });
        res.status(200).send(deans);
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при получении данных деканата');
    }
};

const getById = async (req, res)=>{
    try {
        const id = req.params.id;
        const dean = await Dean.findByPk(id,{
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Roles,
                    as: 'role'
                },
                {
                    model: Dep,
                    as: 'department'
                }
            ]
        });
        res.status(200).send(dean);
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при получении данных деканата');
    }
}


const getByUser = async (req, res)=>{
    try {
        const id = req.params.id;
        const user = await Users.findByPk(id)
        const dean = await Dean.findOne({
            include: [
                {
                    model: Users,
                    as: 'user'
                },
                {
                    model: Roles,
                    as: 'role'
                },
                {
                    model: Dep,
                    as: 'department'
                }
            ],
            where:{userId: user.id}
        });
        res.status(200).send(dean);
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при получении данных деканата');
    }
}

const Update = async (req, res)=>{
    const { salary, duties, departmentId } = req.body;
    const id = req.params.id
    const dean = await Dean.findOne(
        {where:{userId:id}}
    )
    try{
        let info = {
            salary,
            duties,
            departmentId
        };
        const deanEmployeer = await Dean.update(info,{
            where:{id:dean.id}
        });
        res.status(200).send(deanEmployeer)
    }catch (err){
        res.send(err)
    }
}

const DelById = async (req, res) => {
    try {
        const id = req.params.id;
        await Dean.destroy({ where: { id: id } });
        res.send('Employeer deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при удалении записи');
    }
};

const DelByUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user =await Users.findByPk(id)
        await Dean.destroy({ where: { userId: user.id } });
        res.send('Employeer deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при удалении записи');
    }
};

module.exports={
    addDean,
    showAll,
    getById,
    getByUser,
    Update,
    DelById,
    DelByUser
}