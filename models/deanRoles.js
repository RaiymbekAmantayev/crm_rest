module.exports = (sequelize, DataTypes) => {
    const DeanRoles = sequelize.define("deanRoles", {
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return DeanRoles;
};