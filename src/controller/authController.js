const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (MongoDb) => {
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await MongoDb.User.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).send({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.send({ message: 'Login successful', token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error logging in' });
    }
  });


  router.post('/signup', async (req, res) => {
    try {
      const { email, password } = req.body;

      let user = await MongoDb.User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new MongoDb.User({ email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  return router;
};