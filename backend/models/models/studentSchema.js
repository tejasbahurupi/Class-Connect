//studentSchema.js
const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  semail: {
    type: String,
    unique: true,
    required: [true, "Please provide your email address"],
    lowercase: true,
    validators: [validator.isEmail, "Please Provide a valid email"],
  },
  rollNum: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sclassName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sclass",
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
    required: true,
  },
  role: {
    type: String,
    default: "Student",
  },
  examResult: [
    {
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
      },
      marksObtained: {
        type: Number,
        default: 0,
      },
    },
  ],
  attendance: [
    {
      date: {
        type: Date,
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true,
      },
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("student", studentSchema);
