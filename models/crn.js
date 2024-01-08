module.exports = (sequelize, DataTypes) => {
    const CRN = sequelize.define("crn", {
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
    return CRN;
};