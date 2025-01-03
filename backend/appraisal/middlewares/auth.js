const jwt = require('jsonwebtoken');
const JWT_SECRET = '10'; 


const verifyToken = (req, res, next) => {
   console.log("ver");
  const token = req.headers['authorization']?.split(' ')[1] || req.query.jwt_token; 

  if (!token) {

    return res.status(403).send('A token is required for authentication');
  }

  try {
    
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    // console.log("hi")
    next(); 
  } catch (err) {
    return res.status(401).send('Invalid or expired token');
  }
};
module.exports = verifyToken ;
