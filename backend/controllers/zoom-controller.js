const axios = require("axios");
const Student = require("../models/studentSchema");
const nodemailer = require("nodemailer");

// A helper function to get a new Zoom Access Token
const getZoomAccessToken = async () => {
  try {
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "account_credentials",
        account_id: process.env.ZOOM_ACCOUNT_ID,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
        ).toString("base64")}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error getting Zoom access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Could not fetch Zoom token");
  }
};

// Main function to create a meeting and notify students
const createMeeting = async (req, res) => {
  const { topic, startTime, duration, classId } = req.body;

  if (!topic || !startTime || !duration || !classId) {
    return res.status(400).json({
      message: "Missing required fields: topic, startTime, duration, classId",
    });
  }

  try {
    // 1. Get Zoom Access Token
    const accessToken = await getZoomAccessToken();

    // 2. Create the Meeting using Zoom API
    const meetingDetails = {
      topic: topic,
      type: 2, // Scheduled meeting
      start_time: startTime, // ISO 8601 format: e.g., "2025-09-10T10:00:00Z"
      duration: duration, // In minutes
      settings: {
        join_before_host: true,
        mute_upon_entry: true,
        participant_video: true,
        host_video: true,
      },
    };

    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      meetingDetails,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { join_url } = response.data;

    // // 3. Find all students in the specified class
    // //const students = await Student.find({ sclassName: classId });
    // if (students.length === 0) {
    //   return res.status(200).json({
    //     message:
    //       "Meeting created, but no students found in this class to notify.",
    //     join_url,
    //   });
    // }

    // const studentEmails = students.map((student) => student.semail);

    // // 4. Send email notifications to all students
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: "tjbahurupi07@gmail.com",
    //     pass: process.env.nodeMailer_Password,
    //   },
    // });

    // const mailOptions = {
    //   from: '"Class-Connect" <tjbahurupi07@gmail.com>',
    //   to: studentEmails.join(","), // Send to all students at once
    //   subject: `New Class Meeting Scheduled: ${topic}`,
    //   html: `
    //             <p>Hello Students,</p>
    //             <p>A new class has been scheduled by your teacher.</p>
    //             <p><strong>Topic:</strong> ${topic}</p>
    //             <p><strong>Time:</strong> ${new Date(
    //               startTime
    //             ).toLocaleString()}</p>
    //             <p>Please join the meeting using the link below:</p>
    //             <p><a href="${join_url}">${join_url}</a></p>
    //             <br>
    //             <p>Regards,</p>
    //             <p>Class-Connect Team</p>
    //         `,
    // };

    // await transporter.sendMail(mailOptions);

    res.status(201).json({
      message: "Meeting created and notifications sent successfully!",
      join_url,
    });
  } catch (error) {
    console.error(
      "Error in createMeeting:",
      error.response ? error.response.data : error.message
    );
    res
      .status(500)
      .json({ message: "Failed to create meeting or send notifications." });
  }
};

module.exports = { createMeeting };
