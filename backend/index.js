const express = require("express");
const { db } = require("./Database/Dbconnect.js");
const userRouter = require('./router/userRouter.js');
const port = process.env.PORT || 4000;
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');  
const { verifyToken } = require('./middleware/auth.js');

require('dotenv').config(); 
console.log('DB_HOST:', process.env.DB_HOST); 
console.log('DB_USER:', process.env.DB_USER); 

require('dotenv').config();

db(); 
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true 
}));

app.get("/", (req, res) => {
  res.send("Hello, world! The server is running.");
});

app.use("/api/v1/user", userRouter);





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//joi  -backend validation
//orms -knex 
//objection js 
//global error handling
// global logging
// async await ,promise chaining
//interceptors
//file upload =>options
//showing large records
// process management tools pm2
//folder structure


