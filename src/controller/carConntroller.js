const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/")
  },
  filename: function (req, file, cb) {
    const imageName = Date.now() + file.originalname
    cb(null, imageName);
  },
});

const upload = multer({ storage: storage });

module.exports = (MongoDb) => {
  router.post('/addCar', upload.array("image"), async (req, res) => {
    try {
      const { car_model, price, phone, city, number_of_pics } = req.body;


      const files = req.files;

      const car = new MongoDb.Car({ car_model, price, phone, city, number_of_pics });
      await car.save();

      res.send({ message: 'car added' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error logging in' });
    }
  });

  return router;
};