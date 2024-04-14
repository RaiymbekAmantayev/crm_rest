const db = require("../models");
const multer = require("multer");
const Project = db.projects
const Category = db.project_category
const Achievment = db.achivments

const AddProjects = async (req, res) => {
    try {
        const userId = req.user.id;
        const file = req.file.path
        const category = await Category.findByPk(req.body.categoryId);
        const points = category.points;

        const info = {
            title: req.body.title,
            file: file,
            userId,
            categoryId: req.body.categoryId,
            points
        };

        const newProject = await Project.create(info);
        const achievment = await Achievment.findOne({where:{userId: userId}})
        if(achievment){
            await Achievment.update({status:"edited"}, {where:{userId:userId}})
        }
        return res.status(200).json(newProject);
    } catch (err) {
        console.error("Error adding projects:", err);
        res.status(500).send("Internal server error.");
    }
};



const getAllByUser = async (req, res)=>{
    try{
        const userId = req.query.userId
        const projects = await Project.findAll({where:{userId:userId},
        include:{
            model: Category,
            as: 'project_categories'
        }})
        res.send(projects)
    }catch (e){
        console.log(e)
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Projects");
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|pdf|docx)$/)) {
            return cb(new Error("Only image, PDF, and DOCX files are allowed!"));
        }
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
}).single("file");


const changeStatus = async (req, res)=>{
    try{
        const projectId = req.query.projectId
        const project = await Project.findByPk(projectId)
        const userId = project.userId
        const status = 0
        const comment = req.body.comment
        if(req.user.roleId === 1){
            const newStatus = Project.update({status:status, comment:comment, points:0},{where:{id:projectId}})
            await Achievment.update({status:"edited"}, {where:{userId:userId}})
            return res.status(200).send(newStatus)
        }
        return res.status(401).send("u dont have access")
    }catch (e){
        return res.status(500).send("error", e)
    }
}


const DeleteById = async (req, res)=>{
    try{
        const userId = req.user.id
        const id = req.params.id
        await Project.destroy({where:{id:id}})
        const achievment = await Achievment.findOne({where:{userId: userId}})
        if(achievment){
            await Achievment.update({status:"edited"}, {where:{userId:userId}})
        }
        return res.send("success")
    }catch (e){
        return res.status(500).send("error")
    }
}

module.exports={
    AddProjects,
    getAllByUser,
    upload,
    DeleteById,
    changeStatus
}
