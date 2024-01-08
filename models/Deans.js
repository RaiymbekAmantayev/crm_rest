module.exports = (sequelize, DataTypes) => {
    const Deans = sequelize.define("deans", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "users",
                key: "id",
            }
        },
        roleId: {
            type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                model: "roles",
                    key: "id",
            }
        },
        salary: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duties: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "departments",
                key: "id",
            }
        },
    });
    return Deans;
};