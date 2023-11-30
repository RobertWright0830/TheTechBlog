const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

//check if the app is deployed on Heroku, if not, use local database
if (process.env.JAWSDB_URL) {
  //if deployed on Heroku, use the JawsDB database
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  //if deployed locally, use the local database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

//export the Sequlize instance
module.exports = sequelize;
