module.exports = (sequelize, DataTypes) => {
    const IssnLevel = sequelize.define("issn_level", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        points:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });
    return IssnLevel;
};