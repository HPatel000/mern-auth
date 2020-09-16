const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const upload = require('../middleware/fileStorage');
const { check, validationResult } = require('express-validator');

// @route POST api/users
// @desc Register a user
// @access Public
router.post('/', upload.single('img'), [
  check('name', 'Enter your name').not().isEmpty(),
  check('username', 'Set a username').not().isEmpty(),
  check('email', 'Please enter valid email').isEmail(),
  check('password', 'Please enter a valid password').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  const { name, username, email, password } = req.body;
  const img = req.file.filename;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      username,
      img,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(payload, config.get('jwtsecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    })
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server Error');
  }
});

module.exports = router;