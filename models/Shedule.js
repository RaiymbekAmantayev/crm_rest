module.exports = (sequelize, DataTypes) => {
    const Shedules = sequelize.define("shedules", {
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "lessons",
                key: "id",
            }
        },
        week_days: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        auditory: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        CRNId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "crns",
                key: "id",
            }
        },
        TeacherId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "teachers",
                key: "id",
            }
        },
    });
    return Shedules;
};