const { registerNewUser } = require('./register.service');

const registerUser = async (req, res) => {
  const { name, email, pass } = req.body;

  if (!email || !name || !pass) {
    return res.status(400).send('Name, email, and password are required.');
  }

  try {
    const newUser = await registerNewUser(email, name, pass);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { registerUser };
