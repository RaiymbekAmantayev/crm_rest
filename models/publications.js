module.exports = (sequelize, DataTypes) => {
    const Publications = sequelize.define("publications", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        base_url:{
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Publications;
};