require("dotenv").config();
const axios = require("axios");
const sendMail = require("./sendMail-controller");
const Token = require("./../models/TokenSchema");
const Teacher = require("./../models/teacherSchema");
const qs = require("qs");

async function getAccessToken(req, res) {
  try {
    let token = await Token.find({});
    token = token[0]?.token;
    console.log("Aom", token);
    let base64Url = Buffer.from(
      `${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`
    );
    let base64String = base64Url.toString("base64");

    let data = qs.stringify({
      grant_type: "account_credentials",
      account_id: "Gmvy1ozCStOZT9STO135VQ",
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://zoom.us/oauth/token",
      headers: {
        Host: "zoom.us",
        Authorization: `Basic ${base64String}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    axios
      .request(config)
      .then(async (response) => {
        console.log(JSON.stringify(response.data));
        const data = response.data;
        const token = data?.access_token;
        if (token) {
          const tokenData = new Token({
            token: token,
          });

          await Token.deleteMany();
          let output = await tokenData.save();
          console.log(output);
        } else {
          console.log("Error getting token");
        }
        res.json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
    res.send("Error obtaining token");
  }
}

const AccessGen = async (req, res) => {
  const clientId = process.env.ZOOM_API_KEY;
  const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
  const responseType = "code";
  const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
  res.redirect(authorizationUrl);
};
const callback = async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send("No code provided");
  }
  try {
    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.REDIRECT_URI,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.send("Error obtaining token");
  }
};
const refreshGen = async (req, res) => {
  try {
    const refresh_token = req.query.refreshToken;

    const response = await axios.post("https://zoom.us/oauth/token", null, {
      params: {
        grant_type: "refresh_token",
        refresh_token,
      },
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`
        ).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error", error);
    res.send("Error refreshing token");
  }
};
async function createMeeting(
  topic,
  start_time,
  type,
  duration,
  timezone,
  agenda
) {
  try {
    //user id
    //tokem from db
    let token = await Token.find({});
    token = token[0]?.token;
    console.log("Aom", token);
    const response = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic,
        type,
        start_time,
        duration,
        timezone,
        agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0,
          audio: "both",
          auto_recording: "none",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const body = response.data;
    return body;
  } catch (error) {
    console.error("Error", error.message);
  }
}
const getMeetings = async function getMeetings(req, res) {
  try {
    let token = await Token.find({});
    token = token[0]?.token;
    console.log("Aom", token);
    console.log(req.headers);
    const { topic, start_time, duration, teacher } = req.body; //type timezone agenda
    console.log("TEACHER", teacher);
    createMeeting(topic, start_time, 2, duration, "UTC", " ");
    const uid = await Teacher.findById(teacher);
    const uids = uid.email;
    console.log("Hooo", uids);
    const response = await axios.get(
      `https://api.zoom.us/v2/users/me/meetings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    const arr = data.meetings;
    const latest_meeting = arr[arr.length - 1].join_url;
    await sendMail.sendMailT(latest_meeting, teacher);
    res.json(latest_meeting);
    console.log(latest_meeting);
    return latest_meeting;
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = { getMeetings, getAccessToken };
