module.exports = (sequelize, DataTypes) => {
    const Recomend = sequelize.define("recomend", {
        lessonId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "lessons",
                key: "id",
            }
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        },
        reason:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    });
    return Recomend;
};