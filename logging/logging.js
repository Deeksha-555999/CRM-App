const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const path = require('path');


const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

   
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.printf(({ timestamp, level, message, module, api, ...meta }) => {
    let logMessage = `-->${timestamp} :----:`;
    
    if (module) {
      logMessage += ` ${module}`;
    }
    if (api) {
      logMessage += ` :=: ${api}`;
    }
    logMessage += ` :=: ${message}`;
    
    if (Object.keys(meta).length) {
      logMessage += ` ${JSON.stringify(meta)}`;
    }
    
    return logMessage;
  })
);


const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'crm-backend' },
  transports: [
  
    new DailyRotateFile({
      filename: path.join('logs', 'error-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '30d',
      maxSize: '20m'
    }),
 
    new DailyRotateFile({
      filename: path.join('logs', 'combined-%DATE%.log'),
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d',
      maxSize: '20m'
    })
  ]
});


if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: consoleFormat
  }));
}

// Helper functions for logging with module and API context
const log = (apiReference, message, metadata = {}) => {
  if (apiReference) {
    logger.info(message, {
      module: apiReference.module,
      api: apiReference.api,
      apiId: apiReference.apiId, 
      ...metadata
    });
  } else {
    logger.info(message, metadata);
  }
};

const logError = (apiReference, message, metadata = {}) => {
  if (apiReference) {
    logger.error(message, {
      module: apiReference.module,
      api: apiReference.api,
      apiId: apiReference.apiId, 
      ...metadata
    });
  } else {
    logger.error(message, metadata);
  }
};

// Export everything separately to avoid overriding winston's native methods
module.exports = {
  ...logger,
  log,
  logError,
  // Expose winston methods directly
  info: logger.info.bind(logger),
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  debug: logger.debug.bind(logger)
};
