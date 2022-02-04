const db = require("../db");

const UserModel = require('./user');
const AppointmentModel = require('./appointment');
const ToDo = require ('./todo');



module.exports = { 
    UserModel,
    AppointmentModel,
    ToDo
};
