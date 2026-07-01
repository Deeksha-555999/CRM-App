const mysqlLib = require('./mysqllib');
const mongoLib = require('./mongolib');
const { seedUsers } = require('./seedUsers');

const initializeAllDatabases = async () => {
  try {
    // Initialize MySQL
    await mysqlLib.testConnection();
    await mysqlLib.initializeDatabase();

    // MongoDB connection (optional - uncomment if needed)
    // await mongoLib.connectMongoDB();



    console.log(' All databases initialized successfully');
    return true;
  } catch (error) {
    console.error(' Database initialization failed:', error.message);
    throw error;
  }
};

module.exports = {
  mysql: mysqlLib,
  mongodb: mongoLib,
  initializeAllDatabases,
  seedUsers
};