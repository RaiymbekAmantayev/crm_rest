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
        deanRoleId: {
            type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                model: "deanRoles",
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
        }
    });
    return Deans;
};