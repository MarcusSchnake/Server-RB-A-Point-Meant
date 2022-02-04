//two diff type of data day and then date and time, need to be stored separately, in the calendar model
const { DataTypes } = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    
    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },

    message: {
        type: DataTypes.STRING,
        allowNull: false
    },


})

module.exports = Message;