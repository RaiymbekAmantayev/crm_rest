const db = require("../models");
const Articles = db.articles
const multer = require("multer");
const Public = db.publications
const {path} = require("path");

const AddArticles = async (req, res) => {
    try {
        const { publicationId } = req.body;
        const userId = req.user.id;
        let file = null;
        let link = null;

        if (req.file && req.file.path) {
            file = req.file.path;
        }
        if(req.body.link){
            link = req.body.link
        }
        const public = await Public.findByPk(publicationId);
        const points = public.points;
        const { title } = req.body;

        const info = {
            title,
            file,
            link,
            userId,
            publicationId,
            points
        };

        const newArticle = await Articles.create(info);
        return res.status(200).json(newArticle);
    } catch (err) {
        console.error("Error adding articles:", err);
        res.status(500).send("Internal server error.");
    }
};



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Articles/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const upload = multer({ storage: storage })

const getByUser = async (req, res) =>{
    try{
        const userId = req.query.userId
        const articles = await Articles.findAll({where:{userId:userId}})
        res.send(articles)
    }catch (e){
        console.log(e)
        res.status(500).send("error")
    }
}

module.exports={
    AddArticles,
    upload,
    getByUser
}
