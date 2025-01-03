const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

const { generateToken } = require('../../config/jwtConfig.js');

const loginUser = async (email, password) => {
  const user = await User.query().where('email', email).first();
  if (!user) {
    throw new Error('User not found.');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password.');
  }

  const token = generateToken({ name: user.name,email: user.email, id: user.id });
  return { token, user: {name: user.name, email: user.email, id: user.id } };
};

module.exports = { loginUser };
