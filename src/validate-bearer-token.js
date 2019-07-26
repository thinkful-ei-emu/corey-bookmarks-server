const { API_TOKEN } = require('./config');
const logger = require('./logger');

//API token validation 
function validateBearerToken(req, res, next) {
  //console.log(req.app.get('potatoe'));//this comes from app.set
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');//this comes from the header of the request

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    //via winston: an invalid token will display this message and added that log to info.log
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
}

module.exports = validateBearerToken;