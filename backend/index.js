const express = require('express');
const app = express();


const registerRoutes = require('./appraisal/v1/register/register.routes');
const loginRoutes = require('./appraisal/v1/login/login.routes');
const verifyToken = require('./appraisal/middlewares/auth.js');
const cors = require('cors');
const paginationRouter = require('./appraisal/v1/pagination/pagination.routes.js');

require('./appraisal/config/dbConfig.js');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use('/api/v1/user/register', registerRoutes);
app.use('/api/v1/user/login', loginRoutes);

app.use('/api/v1/user/dashboard', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome' });
});

app.use('/api/v1/user/restaurants', paginationRouter)
app.listen(4000, () => console.log('Server running on port 4000'));
