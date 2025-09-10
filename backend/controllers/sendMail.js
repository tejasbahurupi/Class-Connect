const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  try {
    // Connect with the SMTP service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tjbahurupi07@gmail.com",
        pass: process.env.nodeMailer_Password, // Correctly using environment variable
      },
    });

    const mailOptions = {
      from: '"Tejas from PICT 👋" <tjbahurupi07@gmail.com>',
      to: "tjbahurupi07@gmail.com", // You can get this from req.body.to for dynamic recipients
      subject: "Hello from Nodemailer!",
      text: "This is a test email sent from Node.js using Nodemailer.",
    };

    // Use await to send the mail and get info
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.response);

    // Send a success response back to the client
    res
      .status(200)
      .json({ message: "Email sent successfully!", info: info.response });
  } catch (err) {
    console.error("Error occurred: ", err);

    // Send an error response back to the client
    res
      .status(500)
      .json({ message: "Failed to send email.", error: err.message });
  }
};

module.exports = sendMail;
