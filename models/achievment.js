module.exports = (sequelize, DataTypes) => {
    const Achievments = sequelize.define("achievments", {
        bachelor: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        master: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phd: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        experience: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        projects: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        articles: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        possible_sal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Achievments;
};
