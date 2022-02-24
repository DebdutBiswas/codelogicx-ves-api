const dotEnv = require('dotenv');
const { Sequelize } = require('sequelize');

dotEnv.config({ encoding: 'utf-8' });

const { dbHost, dbPort, dbType, dbUser, dbPassword, dbDatabase } = {
  dbHost: process.env.DB_HOST || 'localhost',
  dbPort: process.env.DB_PORT || 3306,
  dbType: process.env.DB_TYPE || 'mysql',
  dbUser: process.env.DB_USER || 'root',
  dbPassword: process.env.DB_PASS || 'abc@123',
  dbDatabase: process.env.DB_DBASE || 'ves'
};

module.exports = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  port: +dbPort,
  dialect: dbType,
  dialectOptions: {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 20000
    }
  }
});