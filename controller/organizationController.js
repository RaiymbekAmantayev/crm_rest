const db = require("../models");
const Organization = db.organization

const addOrganization = async (req, res)=> {
    try {
        const info =
            {
                title: req.body.title,
                points: req.body.points
            }
        const organization = await Organization.findOne({where: {title: info.title}})
        if (organization) {
            return res.send("organiztion exist")
        }
        const newPublic = await Organization.create(info)
        res.send(newPublic)
    } catch (e) {
        console.log(e)
        // res.status(500).send(e)
    }
}

const getAll = async (req, res)=>{
    try{
        const organization = await Organization.findAll()
        res.send(organization)
    }catch (e){
        console.log(e)
    }
}

module.exports={
    addOrganization,
    getAll
}
