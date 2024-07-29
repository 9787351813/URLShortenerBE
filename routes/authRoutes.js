const express = require('express');
const router = express.Router();
const { forgotPassword, register, login, resetPassword } = require('../controllers/authController');

router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/register', register);
router.post('/login', login);


module.exports = router;
