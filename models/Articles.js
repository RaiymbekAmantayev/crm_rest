module.exports = (sequelize, DataTypes) => {
    const Articles = sequelize.define("articles", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        link:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        },
        publicationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "publications",
                key: "id",
            }
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Articles;
};