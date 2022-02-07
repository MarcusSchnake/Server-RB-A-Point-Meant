const db = require("../db");

const userModel= require("./user");
const appointmentModel = require('./appointment');
const todoModel = require('./todo');

userModel.hasMany(appointmentModel,
    { foreignKey: true,
        onDelete:"CASCADE"
});

appointmentModel.hasMany(todoModel,{
    onDelete:"CASCADE",
});

todoModel.belongsTo(appointmentModel,{
    onDelete:"CASCADE",
});

appointmentModel.belongsTo(userModel,{
    onDelete:"CASCADE",
});





module.exports = { 
    dbConnection: db,
    userModel,
    appointmentModel,
    todoModel
};
