const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
    },
    website: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    specialization: {
      type: String,
      require: true,
    },
    profession: {
      type: String,
      require: true,
    },
    experience: {
      type: String,
      require: true,
    },
    feePerConsultation: {
      type: Number,
      require: true,
    },
    fromTime: {
      type: String,
      require: true,
    },
    toTime: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);
const doctormodel = mongoose.model("doctor", doctorSchema);
module.exports = doctormodel;