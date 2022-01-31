const Sequelize = require("sequelize");


const db = new Sequelize(`postgres://postgres:Happy2b1@localhost:5432/a-point-meant`, );



module.exports = db;