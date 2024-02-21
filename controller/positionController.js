const db = require("../models");
const Position = db.position; // Убедитесь, что имя модели совпадает с именем в вашей базе данных

const AddPosition = async (req, res) => {
    let info = {
       title: req.body.title
    };
    try {
        const position = await Position.create(info);
        res.status(200).send(position);
        console.log(position);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании роли");
    }
};

const getPositions = async (req, res)=>{
    try{
        const positions = await Position.findAll()
        res.send(positions)
    }catch (err){
        console.log(err)
        res.status(500).send("error: ",  err)
    }
}

module.exports={
    AddPosition,
    getPositions
}