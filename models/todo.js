const { DataTypes } = require("sequelize");
const db = require("../db");

const ToDo = db.define("todo", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    apptId: {
        type:DataTypes.INTEGER,
        foreignKey: true,
        allowNull: false

    },

    subject: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    todo_item: {
        type: DataTypes.STRING,
        allowNull: false
    },


})

module.exports = ToDo;