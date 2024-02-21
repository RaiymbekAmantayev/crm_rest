const db = require("../models");
const deanRoles = db.deanroles;
const AddRole = async (req, res) => {
    let info = {
        value: req.body.value,
        description: req.body.description
    };
    try {
        const role = await deanRoles.create(info);
        res.status(200).send(role);
        console.log(role);
    } catch (error) {
        console.error(error);
        res.status(500).send("Ошибка при создании роли");
    }
};

const showRoles = async (req, res)=> {
    const roles = await deanRoles.findAll()
    res.send(roles)
}

module.exports = {
    AddRole,
    showRoles,
}