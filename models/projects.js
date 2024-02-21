module.exports = (sequelize, DataTypes) => {
    const Projects = sequelize.define("projects", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        },
        categoryId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "project_categories",
                key: "id",
            }
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Projects;
};