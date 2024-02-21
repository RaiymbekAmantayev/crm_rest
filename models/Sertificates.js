module.exports = (sequelize, DataTypes) => {
    const Sertificates = sequelize.define("sertificates", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        file:{
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            }
        },
        OrganizationId:{
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "organizations",
                key: "id",
            }
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Sertificates;
};