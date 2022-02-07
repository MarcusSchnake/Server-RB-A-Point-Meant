const { DataTypes } = require("sequelize");
const db = require("../db");

const ToDo = db.define("todo", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,

    },

    appointmentId: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,

    },

    subject: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    todo_item: {
        type: DataTypes.STRING,
        allowNull: false
    },


});

module.exports = ToDo;