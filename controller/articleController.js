const db = require("../models");
const Articles = db.articles
const Achievment = db.achivments
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
        const achievment = await Achievment.findOne({where:{userId: userId}})
        if(achievment){
            await Achievment.update({status:"edited"}, {where:{userId:userId}})
        }
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
        const articles = await Articles.findAll({where:{userId:userId},
            include:{
                model: Public,
                as: 'publications'
            }})
        if(!articles){
            return res.status(404).send("article not found")
        }
        res.send(articles)
    }catch (e){
        console.log(e)
        res.status(500).send("error", e)
    }
}

const changeStatus = async (req, res)=>{
    try{
        const articleId = req.query.articleId
        const article = await Articles.findByPk(articleId)
        const userId = article.userId
        const status = 0
        const comment = req.body.comment
        if(req.user.roleId === 1){
            const newStatus = Articles.update({status:status, comment:comment},{where:{id:articleId}})
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
        await Articles.destroy({where:{id:id}})
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
    AddArticles,
    upload,
    getByUser,
    changeStatus,
    DeleteById
}
