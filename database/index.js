const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(process.cwd(),'database', 'data', 'timeaware.db'),
  logging: false, // Set to console.log to see SQL queries
});

// Initialize models
const models = {
  TimeEntry: require('./models/TimeEntry')(sequelize),
  ClockifyRaw: require('./models/ClockifyRaw')(sequelize),
};

// Create db object
const db = {
  ...models,
  sequelize,
  Sequelize,
};

// Add sync method
db.sync = (...args) => sequelize.sync(...args);

module.exports = db;
