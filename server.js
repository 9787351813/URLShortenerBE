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



// Connect to MongoDB
mongoose.connect('mongodb+srv://URLShortener:Kavisha123@cluster0.6kv8p2r.mongodb.net/URLShortener')
.then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err); // Log connection error
    process.exit(1);
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
