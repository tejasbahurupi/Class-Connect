const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  // connect with the smtp
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tjbahurupi07@gmail.com",
      pass: "cjzs wtsa abwa uqyn",
    },
  });

  let mailOptions = {
    from: '"Tejas from PICT 👋" tjbahurupi07@gmail.com',
    to: "tjbahurupi07@gmail.com",
    subject: "Hello from Nodemailer!",
    text: "This is a test email sent from Node.js using Nodemailer.",
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.error("Error occurred: ", err);
    }
    console.log("Email sent successfully:", info.response);
  });
};
module.exports = sendMail;
