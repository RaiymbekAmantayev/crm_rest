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
db.departments = require("../models/departments")(sequelize, DataTypes);
db.deans = require("../models/Deans")(sequelize,DataTypes)
db.lessons = require("../models/lessons")(sequelize,DataTypes)
db.achivments = require("../models/achievment")(sequelize, DataTypes)
db.crn = require("../models/crn")(sequelize,DataTypes)
db.shedule = require("../models/Shedule")(sequelize,DataTypes)


db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

// Установка ассоциаций
// ----------user relations
db.roles.hasMany(db.users, {
    foreignKey: 'roleId',
    as: 'user'
});

db.users.belongsTo(db.roles, {
    foreignKey: 'roleId',
    as: 'role'
});
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
db.roles.hasMany(db.deans, {
    foreignKey: 'roleId',
    as: 'dean'
});

db.deans.belongsTo(db.roles, {
    foreignKey: 'roleId',
    as: 'role'
});
// -----
db.departments.hasMany(db.deans, {
    foreignKey: 'departmentId',
    as: 'dean'
});

db.deans.belongsTo(db.departments, {
    foreignKey: 'departmentId',
    as: 'department'
});

// -----------------lesson relations

db.departments.hasMany(db.lessons, {
    foreignKey: 'departmentId',
    as: 'lessons'
});

db.lessons.belongsTo(db.departments, {
    foreignKey: 'departmentId',
    as: 'department'
});

// --------teacher relations
// Ассоциация 1: У одного пользователя может быть несколько преподавателей
db.users.hasMany(db.teachers, { foreignKey: "userId", as: 'teachers' });
db.teachers.belongsTo(db.users, { foreignKey: "userId", as: 'user' });

// Ассоциация 2: Один отдел может иметь много преподавателей
db.departments.hasMany(db.teachers, { foreignKey: 'departmentId', as: 'teachers' });
db.teachers.belongsTo(db.departments, { foreignKey: 'departmentId', as: 'department' });

// Ассоциация 3: Одно достижение может быть у нескольких преподавателей
db.achivments.hasMany(db.teachers, { foreignKey: 'achivmentsId', as: 'teachers' });
db.teachers.belongsTo(db.achivments, { foreignKey: 'achivmentsId', as: 'achivments' });

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
module.exports = db;
