const db = require("../models");
const multer = require("multer");
const {path} = require("path")
const Sertificates = db.sertificates
const Organization = db.organization
const AddSertificates = async (req, res) => {
    try {
        // Получаем массив файлов из multer
        const file = req.file.path

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
        const sertificates = await Sertificates.findAll({where:{userId:userId}})
        res.send(sertificates)
    }catch (e){
        console.log(e)
        return res.send("error")
    }
}


module.exports={
    AddSertificates,
    getAllByUser,
    upload
}