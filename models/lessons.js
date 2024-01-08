module.exports = (sequelize, DataTypes) => {
    const Lessons = sequelize.define("lessons", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        credit_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
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
    });

    return Lessons;
};