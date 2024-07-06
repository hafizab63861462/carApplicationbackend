module.exports = (MongoDb) => {
  const authController = require('./authController')(MongoDb);
  const carController = require('./carConntroller')(MongoDb);

  return {
    auth: authController,
    car: carController,
  }
};
