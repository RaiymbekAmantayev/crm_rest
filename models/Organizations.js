module.exports = (sequelize, DataTypes) => {
    const Organization = sequelize.define("organizations", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    });
    return Organization;
};