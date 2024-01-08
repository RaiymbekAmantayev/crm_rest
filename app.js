const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/Images", express.static("./Images"));

// Определение маршрутов и других настроек приложения...
const RoleRouter = require("./router/Role_router");
const AuthRouter = require("./router/user_router");
const DepRouter = require("./router/Dep_router");
const DeanRouter = require('./router/Dean_router');
const LessonRouter = require('./router/lesson-router');
const AchievmentRouter = require('./router/achievment-router')
const TeacherRouter = require('./router/teacher-router')
const CrnController = require("./router/crn-router");
const SheduleRouter = require("./router/shedule-router")
app.use("/api/roles", RoleRouter);
app.use("/api/users", AuthRouter);
app.use("/api/dep", DepRouter);
app.use("/api/dean", DeanRouter);
app.use("/api/lesson", LessonRouter);
app.use("/api/achievment", AchievmentRouter)
app.use("/api/teacher",TeacherRouter )
app.use("/api/crn",CrnController )
app.use("/api/shedule", SheduleRouter)



// routers
app.listen(7000, () => {
    console.log("Сервер запущен на порту 7000");
});
