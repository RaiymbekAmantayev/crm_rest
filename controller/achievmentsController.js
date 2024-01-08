const db = require("../models");
const Achievments= db.achivments; // Убедитесь, что имя модели совпадает с именем в вашей базе данных

const addAchievment = async (req, res) => {
    try {
        const achievment = await Achievments.create({
            bachelor: req.body.bachelor,
            master: req.body.master,
            phd: req.body.phd,
            experience: req.body.experience,
            projects: req.body.projects,
            articles: req.body.articles,
            possible_sal: req.body.possible_sal // Убедитесь, что это поле заполнено
        });

        res.status(200).send(achievment);
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong.");
    }
};

module.exports = {
    addAchievment
}