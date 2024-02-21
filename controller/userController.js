const db = require("../models");
const Users = db.users;
const Roles = db.roles;
const Dep = db.departments;
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const multer = require('multer')
const path = require('path')


const Auth = async(req, res) => {
    const { email, password } = req.body;
    const roleId = 2;
    try {
        const hash = await bcrypt.hash(password, 10);
        const newUser = await Users.create({
            email: email,
            password: hash,
            roleId: roleId
        });
        const userId = newUser.id;
        res.json({ message: "Success", userId });
    } catch (error) {
        res.status(500).json({ message: "Error", error: error.message });
    }
};
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ where: { email: email } });

        if (!user) {
            return res.json({ error: "User doesn't exist" });
        }

        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.json({ error: "Wrong username and password combination" });
            }
            const accessToken = sign({username:user.username, id:user.id},
                "importantsecret");
            return  res.send({
                user: user,
                token: accessToken
            });
        })


            .catch((error) => {
                console.error(error);
                return res.json({ error: "Error comparing passwords" });
            });
    } catch (error) {
        console.error(error);
        return res.json({ error: "Internal server error" });
    }
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|pdf)$/)) {
            return cb(new Error("Only image and PDF files are allowed!"));
        }
        cb(null, Date.now() + "-" + file.originalname);
    }
});

// Функция, определяющая какие файлы принимаются
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "image/webp" ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only image and PDF files are allowed!"), false);
    }
};

// Конфигурация Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Лимит размера файла до 1 МБ
    fileFilter: fileFilter // Применение функции фильтрации файлов
}).fields([
    { name: 'image', maxCount: 1 },
    { name: 'cv_file', maxCount: 1 }
]);

// Обработка эндпоинта Complement с использованием Multer для загрузки файлов
const Complement = (req, res) => {
    upload(req, res, async (err) => {
        try {
            if (err) {
                console.error(err);
                return res.status(400).send({ error: err.message });
            }
            const { first_name, last_name, phone_number } = req.body;
            const image = req.files['image'][0].path; // Путь к изображению
            const cv_file = req.files['cv_file'][0].path; // Путь к файлу резюме
            const info = {
                first_name,
                last_name,
                image,
                cv_file,
                phone_number
            };
            const updatedUser = await Users.update(info, { where: { id: req.user.id } });
            res.send(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Ошибка при обновлении пользователя" });
        }
    });
};

const showAll = async (req, res) => {
    try {
        const users = await Users.findAll({
            include: [{
                model: Roles,
                as: 'role'
            },
            {
                model: Dep,
                as: "department"
            }
        ]
        });
        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Ошибка при получении пользователей" });
    }
};

const getById = async (req, res)=>{
    try{
        const id = req.params.id;
        const user = await Users.findByPk(id,{
            include: [{
                model: Roles,
                as: 'role'
            },
                {
                    model: Dep,
                    as: "department"
                }
            ]
        })
        res.send(user)
    }catch(err){
        res.send(err)
    }
}

const getRole = async (req, res, next) => {
    try {
        const user = await Users.findByPk(req.user.id, {
            include: [
                {
                    model: Roles,
                    as: 'role'
                },
            ]
        });

        if (user.role) {
            req.user.role = user.role;
            next();
        } else {
            return res.status(400).send("Роль не найдена для этого пользователя");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Произошла ошибка при извлечении роли пользователя");
    }
};
const Role = async (req, res) => {
    try {
        const id = req.params.id;
        const currentUser = req.user;
        const role = {
            roleId: req.body.roleId
        };
        if(currentUser.roleId == 1){
            const newuser = await Users.update(role, { where: { id: id } });
            return res.send(newuser);
        }
        return res.send("You don't have access to change any user's role");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const Department = async (req, res) => {
    try {
        const id = req.params.id;
        const currentUser = req.user;
        const dep = {
            departmentId: req.body.departmentId
        };
        if(currentUser.roleId == 1){
            const newuser = await Users.update(dep, { where: { id: id } });
            return res.send(newuser);
        }
        return res.send("You don't have access to change any user's role");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

const CurrentUser = async (req, res)=>{
    const userId = req.user.id
    const user = await Users.findByPk(userId,{
        include:[{
            model: Roles,
            as: "role"
        },
        {
            model: Dep,
            as: "department"
        }
        ]})
    res.status(200).send(user)
}

const Delete = async (req, res)=>{
    const id = req.params.id;
    const user = req.user;
    try{
        const delUser = await Users.findByPk(id)
        if(user.email == delUser.email || user.role.value == "admin"){
            await Users.destroy({where:{id:id}})
            res.send( "user deleted succesfully")
        }
        res.send("u dont have access to delete this user")
    }catch(err){
        res.send(err)
    }
}

const getJustUsers = async (req, res)=>{
    try{
        const users = await Users.findAll({where:{roleId: 2}})
        res.send(users)
    }catch (err) {
        console.log(err)
    }
}

module.exports={
    Auth,
    Login,
    Complement,
    Role,
    showAll,
    CurrentUser,
    getRole,
    getById,
    Delete,
    getJustUsers,
    Department
};