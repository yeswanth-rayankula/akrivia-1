const jwt = require('jsonwebtoken');

const JWT_SECRET = '10'; 
const generateToken = (user) => {
  const payload = { name: user.name, email:user.email }; 
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};



module.exports = { generateToken };
