const db = require("../models");
const multer = require("multer");
const Project = db.projects
const Category = db.project_category
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
        return res.status(200).json(newProject);
    } catch (err) {
        console.error("Error adding projects:", err);
        res.status(500).send("Internal server error.");
    }
};



const getAllByUser = async (req, res)=>{
    try{
        const userId =req.query.userId
        const projects = await Project.findAll({where:{userId:userId}})
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

module.exports={
    AddProjects,
    getAllByUser,
    upload
}
