const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const User = require('../models/userModel.js'); 


const registerUser = async (req, res) => {
  const { name, pass } = req.body;

  if (!name || !pass) {
    return res.status(400).send('Name and password are required.');
  }

  try {
    const existingUser = await User.query().findOne({ name });

    if (existingUser) {
      return res.status(400).send('User with this name already exists.');
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    await User.query().insert({
      name,
      pass: hashedPassword,
    });

    res.send('User registered successfully');
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Error registering user.');
  }
};

const loginUser = async (req, res) => {
  const { name, pass } = req.body;

  if (!name || !pass) {
    return res.status(400).send('Name and password are required.');
  }

  try {
    const user = await User.query().findOne({ name });

    if (!user) {
      return res.status(401).send('User not found.');
    }

    const isValid = await bcrypt.compare(pass, user.pass);
    if (!isValid) {
      return res.status(401).send('Invalid password.');
    }

    const token = generateToken({ name: user.name });

    res.cookie('jwt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      path: '/',
    });

    res.status(200).json({
      message: 'User logged in successfully',
      token: token,
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Error logging in user.');
  }
};

module.exports = { registerUser, loginUser };
