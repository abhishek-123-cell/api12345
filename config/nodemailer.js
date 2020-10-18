const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({

    auth: {
      user: abhishekupadhyay483gmail.com, // generated ethereal user
      pass: girdharji, // generated ethereal password
    }
  })

  const mailOptions = {
    from: `upadhyay`,
    to: options.email, 
    subject: options.subject, 
    text: options.message, 
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
