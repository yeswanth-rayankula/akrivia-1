const jwt = require('jsonwebtoken');

const JWT_SECRET = '10'; 
const generateToken = (user) => {
  const payload = { name: user.name, email:user.email, id: user.id}; 
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};



module.exports = { generateToken };
