module.exports = (sequelize, DataTypes) => {
    const Position = sequelize.define("positions", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return Position;
};