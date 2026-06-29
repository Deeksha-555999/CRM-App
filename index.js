require('dotenv').config();
const { initializeApp, startServer } = require('./startup');
const logger = require('./logging/logging');

const main = async () => {
  try {
    logger.info('Starting CRM Backend Application...');
    
   
    const app = await initializeApp();
    
  
    await startServer(app);
  } catch (error) {
    logger.error('Failed to start application:', error);
    process.exit(1);
  }
};


process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});


process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  process.exit(1);
});


main();
