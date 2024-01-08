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
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "departments",
                key: "id",
            }
        },
        achivmentsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "achievments",
                key: "id",
            }
        },
    });
    return Teachers;
};