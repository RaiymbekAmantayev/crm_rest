const db = require("../models");
const multer = require("multer");
const {path} = require("path")
const Sertificates = db.sertificates
const Organization = db.organization
const Achievement = db.achivments
const AddSertificates = async (req, res) => {
    try {
        // Получаем массив файлов из multer
        const file = req.file.path
        const userId =  req.user.id
        const organization = await Organization.findByPk(req.body.OrganizationId);
        if (!organization) {
            return res.status(400).send('Organization not found for one of the certificates');
        }
        const points = organization.points;

            // Создаем объект информации о сертификате
            const info = {
                title: req.body.title,
                file: file, // Получаем путь к файлу из multer
                userId: req.user.id,
                OrganizationId: req.body.OrganizationId,
                points
            };

            const newSertific = await Sertificates.create(info)
            const achievment = await Achievement.findOne({where:{userId: userId}})
            if(achievment){
                await Achievement.update({status:"edited"}, {where:{userId:userId}})
            }
        return res.send(newSertific)
    } catch (err) {
        console.error("Error adding certificates:", err);
        res.status(500).send("Internal server error.");
    }
};




const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Sertificates");
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|pdf|docx)$/)) {
            return cb(new Error("Only image files are allowed!"));
        }
        cb(null, Date.now() + "-" + file.originalname);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Уберем кавычки, так как это число, а не строка
}).single("file");


const getAllByUser = async (req, res)=>{
    try{
        const userId =req.query.userId
        const sertificates = await Sertificates.findAll({where:{userId:userId},
            include:{
                model: Organization,
                as: 'organization'
            }})
        res.send(sertificates)
    }catch (e){
        console.log(e)
        return res.send("error")
    }
}

const changeStatus = async (req, res)=>{
    try{
        const sertificId = req.query.sertificId
        const sertific = await Sertificates.findByPk(sertificId)
        const userId = sertific.userId
        const status = 0
        const comment = req.body.comment
        if(req.user.roleId === 1){
            const newStatus = Sertificates.update({status:status, comment:comment, points:0},{where:{id:sertificId}})
            await Achievement.update({status:"edited"}, {where:{userId:userId}})
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
        await Sertificates.destroy({where:{id:id}})
        const achievment = await Achievement.findOne({where:{userId: userId}})
        if(achievment){
            await Achievement.update({status:"edited"}, {where:{userId:userId}})
        }
        return res.send("success")
    }catch (e){
        return res.status(500).send("error")
    }
}

module.exports={
    AddSertificates,
    getAllByUser,
    upload,
    changeStatus,
    DeleteById
}