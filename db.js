const Sequelize = require("sequelize");
const sequelize = new Sequelize (process.env.DATABASE_URL, {
    
    dialect: 'postgres',

    dialectOptions:
        process.env.ENV  === 'local' ? {} :    {
        ssl: {
            require:true,
            rejectUnauthorized: false
        }
    }

})




module.exports = sequelize;