const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const bodyParser = require("body-parser")
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use("/files", express.static("files"));
// app.use("/files", express.static("files"));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

app.use("/", Routes);

//multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

require("./models/pdfDetails.js");
const PdfSchema = mongoose.model("PdfDetails");
const upload = multer({ storage: storage });
app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const title = req.body.title;
  const fileName = req.file.filename;
  const user = req.body.user;

  try {
    await PdfSchema.create({ title: title, pdf: fileName, user: user });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

app.get("/get-files", async (req, res) => {
  try {
    PdfSchema.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

// require("./pdfDetails");
// const PdfSchema = mongoose.model("PdfDetails");

// app.post("/upload-files", upload.single("file"), async (req, res) => {
//   console.log(req.file);
//   const title = req.body.title;
//   const fileName = req.file.filename;
//   try {
//     await PdfSchema.create({ title: title, pdf: fileName });
//     res.send({ status: "ok" });
//   } catch (error) {
//     res.json({ status: error });
//   }
// });

// app.get("/get-files", async (req, res) => {
//   try {
//     PdfSchema.find({}).then((data) => {
//       res.send({ status: "ok", data: data });
//     });
//   } catch (error) {}
// });

app.listen(PORT, () => {
  console.log(`Server started at port no. ${PORT}`);
});
