const nodemailer = require('nodemailer');

const email = async (email, resetUrl) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        email: 'oviyasraj2001@gmail.com',
        pass: 'jvxgerjdgbktvdty'
      }
    });
    const mailOptions = {
      from: 'oviyasraj2001@gmail.com',
      to:'oviyasraj2001@gmail.com',
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = email;
