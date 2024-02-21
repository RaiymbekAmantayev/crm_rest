module.exports = (sequelize, DataTypes) => {
    const Achievments = sequelize.define("achievments", {
        academic_degree: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        count_of_projects: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        count_of_monography: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        count_of_seminar: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        count_of_articles: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        count_of_sertific: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        current_grade:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "grades",
                key: "id",
            }
        },
        pretend_grade:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "grades",
                key: "id",
            }
        },
        possible_grade:{
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "grades",
                key: "id",
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "users",
                key: "id",
            }
        },
    });

    return Achievments;
};
