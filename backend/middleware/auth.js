const jwt = require('jsonwebtoken');
const JWT_SECRET = '10'; // Replace with your actual secret key


const verifyToken = (req, res, next) => {
    const token=req.cookies.jwt_token;// Extract token from Authorization header
console.log(token);
  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  try {
    // Verify the token using jwt.verify
    const decoded = jwt.verify(token, JWT_SECRET); // Decodes and verifies the token
    //req.user = decoded; // Store the decoded token in the request object (you can access it in later middleware/routes)
    next(); // Call the next middleware/route handler
  } catch (err) {
    return res.status(401).send('Invalid or expired token');
  }
};
module.exports = { verifyToken };
