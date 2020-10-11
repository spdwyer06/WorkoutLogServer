// const { DataTypes } = require("sequelize/types");
// const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
    const WorkoutLog = sequelize.define('workoutLog', {
        description: {
            type: DataTypes.STRING
        },
        definition: {
            type: DataTypes.STRING
        },
        result: {
            type: DataTypes.STRING
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return WorkoutLog;
};