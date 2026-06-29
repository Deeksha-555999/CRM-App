const mongoose = require('mongoose');
const dbConfig = require('./dbProperties');

let isConnected = false;

const connectMongoDB = async () => {
  if (isConnected) {
    console.log('✅ MongoDB already connected');
    return mongoose.connection;
  }

  try {
    await mongoose.connect(dbConfig.mongodb.uri, dbConfig.mongodb.options);
    isConnected = true;
    console.log('✅ MongoDB connected successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    throw error;
  }
};

const disconnectMongoDB = async () => {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('✅ MongoDB disconnected successfully');
  } catch (error) {
    console.error('❌ MongoDB disconnection failed:', error.message);
    throw error;
  }
};

module.exports = {
  connectMongoDB,
  disconnectMongoDB,
  mongoose
};
