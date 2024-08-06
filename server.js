const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
// Load environment variables
dotenv.config();

const app = express();

console.log('MONGODB_URI:', process.env.MONGODB_URI); // Verify the correct value

// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());



const mongoUri = process.env.MONGODB_URI;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Import auth routes
const authRoutes = require('./routes/authRoutes'); // Ensure the path is correct
const urlRoutes = require('./routes/urlRoutes');
// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/url', urlRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  // Add your registration logic here
  // For example, save the user to the database
  // and return a success response
  res.status(200).send({ message: 'Registration successful' });
});

app.post('/api/login', (req, res) => {
  // Your login logic here
  res.send('Login successful');
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;
  // Implement your logic here to handle the password reset
  console.log(`Password reset requested for email: ${email}`);
  res.send({ message: 'Password reset link sent' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
