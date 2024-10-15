const db = require('../database');
const clockifyData = require('../temp/clockify_raw.json');

async function importClockifyData() {
  try {
    // Sync the model with the database
    // await db.sync({ force: true });

    
  } catch (error) {
    console.error('Error importing Clockify data:', error);
  } finally {
    await db.sequelize.close();
  }
}

importClockifyData();
