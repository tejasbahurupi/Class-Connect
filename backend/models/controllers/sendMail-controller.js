const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const Teacher = require("./../models/teacherSchema");
const Student = require("./../models/studentSchema");
const Subject = require("./../models/subjectSchema");
const Class = require("./../models/sclassSchema");
dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMailT = async (link, teacher) => {
  let teach = await Teacher.findById(teacher);
  let subject = await Subject.findById(teach.teachSubject);
  subject = subject.subName;

  // subject=Subject.findById(subject).subName;
  let cl = teach.teachSclass;
  let cla = await Class.findById(cl).sclassName;
  let students = await Student.find({ sclassName: cl });
  let receivers = students.map((student) => student.semail);
  console.log("abc");
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: receivers,
    subject: `CLASSCONNECT ZOOM MEET BY ${teach.name}`,
    html: `
    <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff; /* Background color added */
              border-radius: 10px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Box shadow added */
            }
            h1 {
              color: #007bff;
            }
            p {
              line-height: 1.6;
              color: #555; /* Text color added */
            }
            a {
              color: #007bff; /* Link color added */
              text-decoration: none;
            }
            a:hover {
              text-decoration: underline; /* Underline on hover added */
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>ClassConnect Zoom Meet</h1>
            <p>Hello Students,</p>
            <p>A meet has been scheduled by ${teach.name} for the ${subject} lecture.</p>
            <p>Join the Zoom meeting using the following link:</p>
            <a href="${link}" target="_blank">${link}</a>
            <p>Make sure to attend on time!</p>
            <p>Thank you!</p>
          </div>
        </body>
      </html>`,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent Successfully");
    }
  });
};
const sendMailA = async (student, teacher) => {
  let teach = await Teacher.findById(teacher);
  let std = Student.findById(student);
  let subject = await Subject.findById(teach.teachSubject);
  subject = subject.subName;

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: process.env.TO_EMAIL,
    subject: "LOW ATTENDANCE ALERT",
    html: `
    <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #007bff;
            }
            p {
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>ClassConnect Zoom Meet</h1>
            <p>Hello Students,</p>
            <p>A meet has been scheduled by ${name} for the ${subject} class (${cl}).</p>
            <p>Join the Zoom meeting using the following link:</p>
            <a href="${link}" target="_blank">${link}</a>
            <p>Thank you!</p>
          </div>
        </body>
      </html>`,
  };

  console.log(link);
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent Successfully");
    }
  });
};

module.exports = { sendMailT, sendMailA };
