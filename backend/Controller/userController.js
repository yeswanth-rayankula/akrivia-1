const { db } = require('../Database/Dbconnect.js'); 
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');


const registerUser = async (req, res) => {
  const { name,email, pass } = req.body;
  console.log("hello");
  if (!email || !name || !pass) {
    return res.status(400).send('Name,email and password are required.');
  }

  try {
    
    const connection = await db();
    const checkUserSql = 'SELECT * FROM task1 WHERE email = ?';
    const [existingUser] = await connection.execute(checkUserSql, [email]);

    if (existingUser.length > 0) {
      
      return res.status(400).send('User with this email already exists.');
    }

 
    const hashedPassword = await bcrypt.hash(pass, 10);
    const insertUserSql = 'INSERT INTO task1 (email,name, password) VALUES (?,?, ?)';
    const [result] = await connection.execute(insertUserSql, [email,name, hashedPassword]);

    res.send('User registered successfully');
  } catch (err) {
    console.error('Error during registration:', err.message);
    res.status(500).send('Error registering user.');
  }
};



const loginUser = async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).send('email and password are required.');
  }

  try {
   
    const connection = await db();  
    const sql = 'SELECT * FROM task1 WHERE email = ?';
    const [rows] = await connection.execute(sql, [email]);  

    if (rows.length === 0) {
      return res.status(401).send('User not found.');
    }

    const user = rows[0];

    const isValid = await bcrypt.compare(pass, user.password);
    if (!isValid) {
      return res.status(401).send('Invalid password.');
    }
    // console.log(user.email);

    const token = generateToken({ email: user.email,name:user.name });
    // console.log(user.email);

    console.log(token);
     res.status(200).json({
      message: 'User logged in successfully',
      token: token  
    });
  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).send('Error logging in user.');
  }
};

module.exports = { registerUser, loginUser };
