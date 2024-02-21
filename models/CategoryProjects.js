module.exports = (sequelize, DataTypes) => {
    const Project_Category = sequelize.define("project_categories", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Project_Category;
};
