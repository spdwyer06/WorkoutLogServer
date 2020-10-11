// These were automatically added when I added line 5
// const { DataTypes } = require("sequelize/types");
// const sequelize = require("../db");

const workoutLog = require("./workoutLog");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return User;
};

