module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define("categories", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Category;
};

