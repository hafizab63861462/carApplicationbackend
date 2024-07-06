const express = require('express');
const router = express.Router();


module.exports = (MongoDb) => {
  router.post('/addCar', async (req, res) => {
    try {
      const { car_model, price, phone, city, number_of_pics, uploadimage } = req.body;


      res.send({ message: 'car added' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error logging in' });
    }
  });

  return router;
};
