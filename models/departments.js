module.exports = (sequelize, DataTypes) => {
    const Department = sequelize.define("departments", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Department;
};