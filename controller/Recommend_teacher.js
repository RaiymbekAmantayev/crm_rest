const db = require("../models");
const Articles = db.articles
const Sertificates = db.sertificates
const { Sequelize } = require('sequelize');
const sequelize = require("sequelize");
const Projects = db.projects
const Users = db.users
const Lesson = db.lessons; // Убедитесь, что имя модели совпадает с именем в вашей базе данных
const Dep = db.departments
const Recomend = db.recomend

const checkingRecommend = async () => {
    try {
        const lessons = await Lesson.findAll();
        const users = await Users.findAll({ where: { roleId: 4 } });
        const articles = await Articles.findAll({ where: { status: 1, parsed: 1 } });
        const sertific = await Sertificates.findAll({ where: { status: 1, parsed: 1 } });
        const projects = await Projects.findAll({ where: { status: 1, parsed: 1 } });

        for (const user of users) {
            let recommendedItems = [];

            // Function to count matches
            const countMatches = (text, lesson) => {
                let count = 0;
                if (text.includes(lesson.title)) count++;
                if (text.includes(lesson.description)) count++;
                return count;
            };

            // Check articles
            for (const article of articles) {
                if (article.userId === user.id) {
                    let matchCount = 0;
                    for (const lesson of lessons) {
                        matchCount += countMatches(article.title, lesson);
                        matchCount += countMatches(article.title, lesson);

                        if (matchCount > 0) {
                            recommendedItems.push({type: 'article', id: lesson.id, matchCount});
                        }
                    }
                }
            }

            // Check certificates
            for (const certificate of sertific) {
                if (certificate.userId === user.id) {
                    let matchCount = 0;
                    for (const lesson of lessons) {
                        matchCount += countMatches(certificate.title, lesson);
                        matchCount += countMatches(certificate.title, lesson);
                        if (matchCount > 0) {
                            recommendedItems.push({type: 'certificate', id: lesson.id, matchCount});
                        }
                    }
                }
            }

            // Check projects
            for (const project of projects) {
                if (project.userId === user.id) {
                    let matchCount = 0;
                    for (const lesson of lessons) {
                        matchCount += countMatches(project.title, lesson);
                        matchCount += countMatches(project.title, lesson);
                        if (matchCount > 0) {
                            recommendedItems.push({type: 'project', id: lessons.id, matchCount});
                        }
                    }
                }
            }

            // Prioritize recommendations by match count (highest to lowest)
            recommendedItems.sort((a, b) => b.matchCount - a.matchCount);
            // Create recommendations
            for (const item of recommendedItems) {
                const info = {
                    lessonId: item.id,
                    userId: user.id,
                    reason: `Matched ${item.matchCount} times in ${item.type}`
                };
                const recommend = await Recomend.findAll({where:{lessonId:info.lessonId, userId:info.userId}})
                if(recommend.length>0){
                    console.log("recommend already exists")
                    return;
                }
                const result = await Recomend.create(info);
                console.log(result)
            }
        }
    } catch (e) {
        console.log(e);
    }
};


module.exports={
    checkingRecommend
}
