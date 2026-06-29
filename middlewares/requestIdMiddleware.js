const { v4: uuidv4 } = require('uuid');

function requestIdMiddleware(req, res, next) {
  req.apiId = uuidv4();   
  next();
}

module.exports = requestIdMiddleware;
