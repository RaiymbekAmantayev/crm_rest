const db = require("../models");
const Shedule= db.shedule;
const Dean = db.deans;
const Lesson = db.lessons;
const Teacher = db.teachers;
const CRN = db.crn
const User = db.users

const addShedule = async (req, res)=>{
    const {lessonId, week_days, start_time, end_time, auditory, CRNId, TeacherId}= req.body;
    try {
        const sheduleTeacher = await Shedule.findOne({   //  не должен существовать
            where: {
                week_days:week_days,
                start_time: start_time,
                TeacherId: TeacherId
            }
        });
        const sheduleAuditory = await Shedule.findOne({  //  не должен существовать
            where: {
                week_days:week_days,
                start_time: start_time,
                auditory: auditory
            }
        });
        const sheduleCrn = await Shedule.findOne({  //  не должен существовать
            where: {
                week_days:week_days,
                start_time: start_time,
                CRNId: CRNId
            }
        });
        const userId = req.user.id;
        const isFromDean = await Dean.findOne({
            where: {userId: userId}
        });
        const lesson = await Lesson.findByPk(lessonId)
        const teacher = await Teacher.findByPk(TeacherId)
        const TeacherDepartment = await User.findByPk(teacher.userId)
        let info = {
            lessonId,
            week_days,
            start_time,
            end_time,
            auditory,
            CRNId,
            TeacherId
        }

        if (isFromDean && req.user.departmentId == lesson.departmentId && lesson.departmentId == TeacherDepartment.departmentId && !sheduleTeacher && !sheduleAuditory && !sheduleCrn) {
            const newShedule = await Shedule.create(info)
            res.send(newShedule)
        }
        else {
            res.send("something goes wrong")
        }
    }catch (err){
        console.log(err)
    }
}
const getAll = async (req, res) => {
    const userId = req.user.id;
    const userDepartmentId = req.user.departmentId;
    const isFromDean = await Dean.findOne({
        where: { userId: userId }
    });
    try {
        if (isFromDean) {
            const schedules = await Shedule.findAll({
                include: [
                    {
                        model: Lesson,
                        as: 'lessons',
                        where: {
                            departmentId: userDepartmentId
                        },
                    },
                    {
                        model: CRN,
                        as: 'crns'
                    },
                    {
                        model: Teacher,
                        as: 'teachers',
                        include: [
                            {
                                model: User,
                                as: 'user'
                            }
                        ]
                    }
                ]
            });
            res.status(200).send(schedules);
        } else {
           return res.send("You don't have access");
        }
    }catch(err){
        console.log(err)
    }
}
const getById = async (req,res)=>{
    const id =req.params.id;
    const userId = req.user.id
    const isFromDean = await Dean.findOne({
        where: {userId: userId}
    });
    try{
        if(isFromDean){
            const shedules = await Shedule.findByPk(id,({
                include: [
                    {
                        model: Lesson,
                        as: 'lessons'
                    },
                    {
                        model: CRN,
                        as: 'crns'
                    },
                    {
                        model: Teacher,
                        as: 'teachers'
                    }
                ]
            }))
            res.status(200).send(shedules)
        }
        else{
            res.send("u dont have acess")
        }
    }catch(err){
        console.log(err)
    }
}
const getForTeacher = async (req, res)=>{
    const userId = req.user.id;
    const isFromTeacher = await Teacher.findOne({
        where: {userId: userId}
    });
    try {
        if(!isFromTeacher){
            return res.status(404).send("user not found")
        }
        const MyShedules = await Shedule.findAll({where:{TeacherId:isFromTeacher.id},
            include: [
                {
                    model: Lesson,
                    as: 'lessons'
                },
                {
                    model: CRN,
                    as: 'crns'
                },
            ]})
        res.status(200).send(MyShedules)
    }catch (err){
        console.log(err)
    }
}

const getIdForTeacher = async (req,res)=>{
    const id =req.params.id;
    const userId = req.user.id
    const isTeacher = await Teacher.findOne({
        where: {userId: userId}
    });
    try{
        if(isTeacher){
            const shedules = await Shedule.findByPk(id,({
                where:{TeacherId:isTeacher.id},
                include: [
                    {
                        model: Lesson,
                        as: 'lessons'
                    },
                    {
                        model: CRN,
                        as: 'crns'
                    },
                ]
            }))
            res.status(200).send(shedules)
        }
        else{
            res.send("u dont have acess")
        }
    }catch(err){
        console.log(err)
    }
}
const Update = async (req, res)=>{
    const id = req.params.id;
    const {lessonId, week_days, start_time, end_time, auditory, CRNId, TeacherId}= req.body;
    try {
        const sheduleTeacher = await Shedule.findOne({   //  не должен существовать
            where: {
                week_days:week_days,
                start_time: start_time,
                TeacherId: TeacherId
            }
        });
        const sheduleAuditory = await Shedule.findOne({  //  не должен существовать
            where: {
                week_days:week_days,
                start_time: start_time,
                auditory: auditory
            }
        });
        const sheduleCrn = await Shedule.findOne({  //  не должен существовать
            where: {
                week_days:week_days,
                start_time: start_time,
                CRNId: CRNId
            }
        });
        const userId = req.user.id;
        const isFromDean = await Dean.findOne({
            where: {userId: userId}
        });
        const lesson = await Lesson.findByPk(lessonId)
        const teacher = await Teacher.findByPk(TeacherId)

        let info = {
            lessonId,
            week_days,
            start_time,
            end_time,
            auditory,
            CRNId,
            TeacherId
        }

        if (isFromDean && isFromDean.departmentId == lesson.departmentId && lesson.departmentId == teacher.departmentId && !sheduleTeacher && !sheduleAuditory && !sheduleCrn) {
            const newShedule = await Shedule.update(info,{
                where:{id:id}
            });
            res.send(newShedule)
        }
        else {
            res.send("something goes wrong")
        }
    }catch (err){
        console.log(err)
    }
}
module.exports={
    addShedule,
    getAll,
    getForTeacher,
    Update,
    getById,
    getIdForTeacher
}



// const formattedSchedules = schedules.map(schedule => {
//     return {
//         lesson: schedule.lessons,
//         crn: schedule.crns,
//         teacher: schedule.teachers
//     };
// });