const { DataTypes } = require("sequelize");
const db = require("../db");

const Appointment = db.define("appointment", {
    appointment:{
        type: DataTypes.INTEGER,
        allowNull:false
    },
    message:{
        type: DataTypes.STRING,
        allowNull:true
    },
    
    
    
})

module.exports = Appointment;