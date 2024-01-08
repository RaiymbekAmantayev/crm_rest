const db = require("../models");
const CRN= db.crn;
const addCRN = async (req, res) => {
    let info = {
        title: req.body.title,
    };
    try {
        const crn = await CRN.create(info);
        res.status(200).send(crn);
        console.log(crn);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании CRN");
    }
};

const showAll = async (req, res)=>{
    try{
        const crn = await CRN.findAll()
        res.status(200).send(crn)
    }catch(err){
        res.send(err)
    }
}

const getByID = async (req, res)=>{
    const id = req.params.id;
    const crn =await CRN.findByPk(id)
    res.send(crn)
}

const Update = async (req, res)=>{
    const id = req.params.id;
    try{
        let info = {
            title: req.body.title,
        };
        const crn = await CRN.update(info,{where:{id:id}})
        res.send(crn)
    }catch(err){
        console.log(err)
    }
}
const Delete = async (req, res)=>{
    const id = req.params.id;
    try{
        await CRN.destroy({where:{id:id}})
        res.send("succes")
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    addCRN,
    showAll,
    getByID,
    Update,
    Delete
}