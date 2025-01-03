const { loginUser } = require('./login.service');

const loginUserHandler = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send('Email and password are required.');
  }

  try {
    const { token, user } = await loginUser(email, pass);
    res.status(200).json({ message: 'User logged in successfully', token, user });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = { loginUserHandler };
