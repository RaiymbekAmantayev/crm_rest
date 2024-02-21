const dbConfig = require('../config/db_config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch(err => {
        console.log('Error' + err);
    });

const db = {};


db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Подключение моделей
db.teachers = require("../models/teachers")(sequelize,DataTypes)
db.users = require('../models/Users')(sequelize, DataTypes);
db.roles = require('../models/Roles')(sequelize, DataTypes);
db.deanroles = require('../models/deanRoles')(sequelize, DataTypes);
db.departments = require("../models/departments")(sequelize, DataTypes);
db.deans = require("../models/Deans")(sequelize,DataTypes)
db.lessons = require("../models/lessons")(sequelize,DataTypes)
db.achivments = require("../models/achievment")(sequelize, DataTypes)
db.crn = require("../models/crn")(sequelize,DataTypes)
db.shedule = require("../models/Shedule")(sequelize,DataTypes)
db.category = require("../models/lessonCategory")(sequelize,DataTypes)
db.position = require("../models/positions")(sequelize,DataTypes)
db.grades = require("../models/grades")(sequelize,DataTypes)
db.publications = require("../models/publications")(sequelize,DataTypes)
db.articles = require("../models/Articles")(sequelize,DataTypes)
db.organization = require("../models/Organizations")(sequelize,DataTypes)
db.sertificates = require("../models/Sertificates")(sequelize,DataTypes)
db.project_category = require("../models/CategoryProjects")(sequelize, DataTypes)
db.projects = require("../models/projects")(sequelize,DataTypes)


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

// Установка ассоциаций


                        //projects association
db.project_category.hasMany(db.projects, { foreignKey: 'categoryId', as: 'projects' });
db.projects.belongsTo(db.project_category, { foreignKey: 'categoryId', as: 'project_categories' });

//projects-user
db.users.hasMany(db.projects, { foreignKey: 'userId', as: 'projects' });
db.projects.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });


                                        // sertificates association

// sertificate-organization
db.organization.hasMany(db.sertificates, { foreignKey: 'OrganizationId', as: 'sertificates' });
db.sertificates.belongsTo(db.organization, { foreignKey: 'OrganizationId', as: 'organization' });

//sertificate-user
db.users.hasMany(db.sertificates, { foreignKey: 'userId', as: 'sertificates' });
db.sertificates.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });


                                    // articles association

// article-public
db.publications.hasMany(db.articles, { foreignKey: 'publicationId', as: 'articles' });
db.articles.belongsTo(db.publications, { foreignKey: 'publicationId', as: 'publications' });
//article-user
db.users.hasMany(db.articles, { foreignKey: 'userId', as: 'articles' });
db.articles.belongsTo(db.users, { foreignKey: 'userId', as: 'users' });

                                            // grade association
// grade-position
db.position.hasMany(db.grades, { foreignKey: 'positionId', as: 'grades' });
db.grades.belongsTo(db.position, { foreignKey: 'positionId', as: 'position' });


// grade-department
db.departments.hasMany(db.grades, { foreignKey: 'departmentId', as: 'grades' });
db.grades.belongsTo(db.departments, { foreignKey: 'departmentId', as: 'departments' });

// ----------user relations
db.roles.hasMany(db.users, {
    foreignKey: 'roleId',
    as: 'user'
});

db.users.belongsTo(db.roles, {
    foreignKey: 'roleId',
    as: 'role'
});

db.departments.hasMany(db.users, { foreignKey: 'departmentId', as: 'users' });
db.users.belongsTo(db.departments, { foreignKey: 'departmentId', as: 'department' });

// -------------------dean relations
db.users.hasMany(db.deans,{
    foreignKey: "userId",
    as: 'dean'
});

db.deans.belongsTo(db.users,{
    foreignKey: "userId",
    as: "user"
})



// ----------
db.deanroles.hasMany(db.deans, {
    foreignKey: 'deanRoleId',
    as: 'dean'
});

db.deans.belongsTo(db.deanroles, {
    foreignKey: 'deanRoleId',
    as: 'role'
});
// -----


// -----------------lesson relations

db.departments.hasMany(db.lessons, {
    foreignKey: 'departmentId',
    as: 'lessons'
});

db.lessons.belongsTo(db.departments, {
    foreignKey: 'departmentId',
    as: 'department'
});

// ---
db.category.hasMany(db.lessons, {
    foreignKey: 'categoryId',
    as: 'lessons'
});

db.lessons.belongsTo(db.category, {
    foreignKey: 'categoryId',
    as: 'categories'
});

// --------achievments relations
// Ассоциация 1: У одного пользователя может быть несколько достижении
db.users.hasMany(db.achivments, { foreignKey: "userId", as: 'achievments' });
db.achivments.belongsTo(db.users, { foreignKey: "userId", as: 'user' });

// Ассоциация 2:
db.grades.hasMany(db.achivments, { foreignKey: 'current_grade', as: 'currentGradeAchievements' });
db.achivments.belongsTo(db.grades, { foreignKey: 'current_grade', as: 'current_grades' });
// Ассоциация 3:
db.grades.hasMany(db.achivments, { foreignKey: 'pretend_grade', as: 'pretendGradeAchievements' });
db.achivments.belongsTo(db.grades, { foreignKey: 'pretend_grade', as: 'pretend_grades' });
// Ассоциация 4:
db.grades.hasMany(db.achivments, { foreignKey: 'possible_grade', as: 'possibleGradeAchievements' });
db.achivments.belongsTo(db.grades, { foreignKey: 'possible_grade', as: 'possible_grades' });



// --------teacher relations
// Ассоциация 1:
db.users.hasMany(db.teachers, { foreignKey: "userId", as: 'teachers' });
db.teachers.belongsTo(db.users, { foreignKey: "userId", as: 'user' });


// Ассоциация 2:

db.achivments.hasMany(db.teachers, { foreignKey: 'achivmentsId', as: 'teachers' });
db.teachers.belongsTo(db.achivments, { foreignKey: 'achivmentsId', as: 'achievments' });


// Ассоциация 3:
db.grades.hasMany(db.teachers, { foreignKey: 'gradeId', as: 'teachers' });
db.teachers.belongsTo(db.grades, { foreignKey: 'gradeId', as: 'grades' });

//------shedule relations
// Ассоциация 1: Одна дисциплина может быть в нескольких расписании
db.lessons.hasMany(db.shedule, {foreignKey: 'lessonId', as: 'shedules'});
db.shedule.belongsTo(db.lessons,{foreignKey:'lessonId', as: 'lessons'});

// Ассоциация 2: Один crn может быть в нескольких расписании
db.crn.hasMany(db.shedule, {foreignKey: 'CRNId', as: 'shedules'});
db.shedule.belongsTo(db.crn,{foreignKey:'CRNId', as: 'crns'});

// Ассоциация 3: Один преподователь может быть в нескольких расписании
db.teachers.hasMany(db.shedule, { foreignKey: 'TeacherId', as: 'shedules' });
db.shedule.belongsTo(db.teachers, { foreignKey: 'TeacherId', as: 'teachers' });

module.exports = db

