const timeEntryData = require('../temp/time_entry_for_report2.json');
const db = require('../database');

async function importTimeEntryData() {
  try {
    // Sync the model with the database
    await db.sync({ force: true });

    // Use the TimeEntry model
    await db.TimeEntry.bulkCreate(timeEntryData);

    console.log('Time entry data imported successfully');
  } catch (error) {
    console.error('Error importing time entry data:', error);
  } finally {
    await db.sequelize.close();
  }
}

importTimeEntryData();
