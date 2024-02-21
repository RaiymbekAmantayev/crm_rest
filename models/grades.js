const { DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Grade = sequelize.define("grades", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hasPhd: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        experience:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        min_count_article:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        min_count_projects:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        min_count_sertificates: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        min_count_seminar: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        min_count_monography: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        positionId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "positions",
                key: "id",
            }
        },
        departmentId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "departments",
                key: "id",
            }
        },
    });
    return Grade
};


