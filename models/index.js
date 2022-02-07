const db = require("../db");

const UserModel= require("./user");
const AppointmentModel = require('./appointment');
const ToDoModel = require('./todo');

UserModel.hasMany(AppointmentModel,{
    onDelete:"CASCADE"
});

AppointmentModel.hasMany(ToDoModel,{
    onDelete:"CASCADE",
});

// ToDoModel.belongsTo(AppointmentModel,{
//     onDelete:"CASCADE",
// });

AppointmentModel.belongsTo(UserModel,{
    onDelete:"CASCADE",
});





module.exports = { 
    dbConnection: db,
    UserModel,
    AppointmentModel,
    ToDoModel
};
