const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generatePasswordResetToken = async (user) => {
    const payload = {
        userId: user._id,
    };
    const secretKey = process.env.JWT_SECRET; // Ensure this is consistent
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    return token;
};
