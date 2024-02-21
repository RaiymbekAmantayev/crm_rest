const db = require("../models");
const Publications = db.publications

const addPubilc = async (req, res)=>{
    try{
        const info =
            {
                title:req.body.title,
                points: req.body.points
            }
            const public = await Publications.findOne({where: {title: req.body.title}})
            if(public){
               return res.send("public exist")
            }
        const newPublic = await Publications.create(info)
        res.send(newPublic)
    }catch (e){
        res.status(500).send(e)
    }
}

const getAll = async (req, res)=>{
    try{
        const publics = await Publications.findAll()
        res.send(publics)
    }catch (e){
        console.log(e)
    }
}

module.exports={
    addPubilc,
    getAll
}