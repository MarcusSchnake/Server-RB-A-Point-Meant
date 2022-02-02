const { DataTypes } = require("sequelize");
const db = require("../db");

const Appointment = db.define("appointment", {
    appointment: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    time: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true
    },



})

module.exports = Appointment;