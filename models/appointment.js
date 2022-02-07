const { DataTypes } = require("sequelize");// had {DataTypes, UniqueContrstraintError}
const db = require("../db");

const Appointment = db.define("appointment", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },

    userId: {
        type: DataTypes.UUID,
        foreignKey: true,
        allowNull: false,
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

    startDateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },

    note: {
        type: DataTypes.STRING,
        allowNull: true
    },



});

module.exports = Appointment;