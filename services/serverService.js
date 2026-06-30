const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const envProperties = require('../properties/envProperties');

const configureServer = (app) => {
  // CORS Configuration
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        'http://localhost:5173',
        'http://localhost:5174',
        envProperties.corsOrigin
      ].filter(Boolean); // Remove any undefined values
      
      if (
        allowedOrigins.includes(origin) ||
        (envProperties.nodeEnv === 'development' && /^http:\/\/localhost(:\d+)?$/.test(origin))
      ) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  };
  
  app.use(cors(corsOptions));


  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(cookieParser());

 
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'OK', 
      message: 'CRM Backend is running',
      timestamp: new Date().toISOString(),
      environment: envProperties.nodeEnv
    });
  });

  return app;
};

module.exports = configureServer;