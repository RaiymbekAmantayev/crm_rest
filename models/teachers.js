module.exports = (sequelize, DataTypes) => {
    const Teachers = sequelize.define("teachers", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "users",
                key: "id",
            }
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        student_survey: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        achivmentsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "achievments",
                key: "id",
            }
        },
        gradeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "grades",
                key: "id",
            }
        },
    });
    return Teachers;
};