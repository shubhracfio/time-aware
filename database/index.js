const { Sequelize } = require('sequelize');
const path = require('path');

/*======================Initialize Sequelize======================*/

let dbConfig = {}
let dbProvider = process.env.DB_PROVIDER || 'sqlite'

if(dbProvider === 'postgres') {
   //----------------------POSTGRES----------------------
   dbConfig = {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ?? 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    logging: false, // Set to console.log to see SQL queries
  }
} else {
  //----------------------SQLITE----------------------
  let database = process.env.DB_DATABASE || 'timeaware'
  dbConfig = {
    dialect: 'sqlite',
    storage: path.join(process.cwd(),'database', 'data', `${database}.db`),
    logging: false, // Set to console.log to see SQL queries
  }
}

// Initialize
const sequelize = new Sequelize(dbConfig);





/*======================Initialize models======================*/

const models = {
  TimeEntry: require('./models/TimeEntry')(sequelize),
  ClockifyRaw: require('./models/ClockifyRaw')(sequelize),
}


/*
* Uncomment this line and run the server to sync the database
*/
// sequelize.sync({force:false})
  


//Create db object
const db = {
  ...models,
  sequelize,
  Sequelize,
};

// Add sync method
db.sync = (...args) => sequelize.sync(...args);

module.exports = db;