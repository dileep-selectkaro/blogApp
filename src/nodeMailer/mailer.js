
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'dileepkm156@gmail.com',
    pass: 'voqe ctgk cpmh drng'
  },
});

module.exports = transporter;
