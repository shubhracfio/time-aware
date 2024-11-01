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
    database: process.env.AUTH_DB_DATABASE || 'auth_timeaware',
    logging: false, // Set to console.log to see SQL queries
  }
} else {
  //----------------------SQLITE----------------------
  let database = process.env.AUTH_DB_DATABASE || 'auth_timeaware'
  dbConfig = {
    dialect: 'sqlite',
    storage: path.join(process.cwd(),'auth','database', 'data', `${database}.db`),
    logging: false, // Set to console.log to see SQL queries
  }
}

// Initialize
const sequelize = new Sequelize(dbConfig);





/*======================Initialize models======================*/

const models = {
  Users: require('./models/Users.model.js')(sequelize),
  AuthAccounts: require('./models/Accounts.model.js')(sequelize),
  AuthSessions: require('./models/Sessions.model.js')(sequelize),
  AuthVerificationTokens: require('./models/VerificationTokens.model.js')(sequelize),
}


/*
* Uncomment this line and run the server to sync the database
*/
// sequelize.sync({force:false})
  


//Create db object
const db = {
  ...models,
  AuthSequelize:sequelize
}

// Add sync method
db.sync = (...args) => sequelize.sync(...args);

module.exports = db;