const nodemailer = require('nodemailer');

const sendResetEmail = async (email, resetUrl) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'oviyasraj2001@gmail.com', // Replace with your Gmail email
        pass: 'ypkzmeenvumwuamu' // Replace with your Gmail password or app-specific password
      }
    });
     // console.log(transporter);
    const mailOptions = {
      from: 'oviyasraj2001@gmail.com',
      to: 'oviyasraj2001@gmail.com',
      subject: "subject",
      text: resetUrl
      
    };

    await transporter.sendMail(mailOptions);
    console.log('Recovery email sent');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { error: 'Error sending email' };
  }
};

module.exports = sendResetEmail;
