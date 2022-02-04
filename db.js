const Sequelize = require("sequelize");
const sequelize = new Sequelize ((process.env.ENV  === 'local' ? process.env.DEV_URL :process.env.DATABASE_URL), {
    
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