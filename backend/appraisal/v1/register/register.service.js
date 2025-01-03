const bcrypt = require('bcryptjs');
const User = require('../../models/userModel');

const generateRandomPartId = () => Math.floor(Math.random() * 5) + 1;
const registerNewUser = async (email, name, password) => {
  const existingUser = await User.query().where('email', email).first();
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
 
  
  const newUser = await User.query().insert({ email, name, password: hashedPassword,part_id: generateRandomPartId()});
  return { email: newUser.email, name: newUser.name };
};

module.exports = { registerNewUser };
