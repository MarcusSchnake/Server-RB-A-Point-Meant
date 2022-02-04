const { DataTypes } = require("sequelize");
const db = require("../db");

const Appointment = db.define("appointment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId:{
        type: DataTypes.INTEGER,
        foreignKey: true,
        allowNull:false
    },
    
    client_name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE,
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