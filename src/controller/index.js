module.exports = (MongoDb) => {
  const authController = require('./authController')(MongoDb);

  return {
    auth: authController
  }
};
