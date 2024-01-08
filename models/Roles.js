module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("roles", {
        value: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Roles;
};