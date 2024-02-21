const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use("/Images", express.static("./Images"));
app.use("/Articles", express.static("./Articles"));

// Определение маршрутов и других настроек приложения...
const RoleRouter = require("./router/Role_router");
const deanRoleRouter = require("./router/deanRole-router");
const AuthRouter = require("./router/user_router");
const DepRouter = require("./router/Dep_router");
const DeanRouter = require('./router/Dean_router');
const LessonRouter = require('./router/lesson-router');
const AchievmentRouter = require('./router/achievment-router')
const TeacherRouter = require('./router/teacher-router')
const CrnController = require("./router/crn-router");
const SheduleRouter = require("./router/shedule-router")
const CategoryRouter = require("./router/category-router")
const PositionRouter = require('./router/position-router')
const GradeRouter = require('./router/grade-router')
const PublicRouter = require('./router/publications-router')
const ArticleRouter = require('./router/articles-router')
const SertificRouter = require('./router/sertificates-router')
const OrganizeRouter = require('./router/organitarion-router')
const ProjectCategory = require('./router/project_category_router')
const ProjectsRouter = require('./router/projects-router')


app.use("/api/roles", RoleRouter);
app.use("/api/deanRoles", deanRoleRouter);
app.use("/api/users", AuthRouter);
app.use("/api/dep", DepRouter);
app.use("/api/dean", DeanRouter);
app.use("/api/lesson", LessonRouter);
app.use("/api/achievment", AchievmentRouter)
app.use("/api/teacher",TeacherRouter )
app.use("/api/crn",CrnController )
app.use("/api/shedule", SheduleRouter)
app.use("/api/category", CategoryRouter)
app.use("/api/pos", PositionRouter)
app.use("/api/grade", GradeRouter)
app.use("/api/pub", PublicRouter)
app.use("/api/art", ArticleRouter)
app.use("/api/organ", OrganizeRouter)
app.use("/api/sertific", SertificRouter)
app.use("/api/pro_cat", ProjectCategory)
app.use("/api/project", ProjectsRouter)

// routers
app.listen(7000, () => {
    console.log("Сервер запущен на порту 7000");
});
