const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps }
);

const usermodel = mongoose.model("user", userSchema);
module.exports =usermodel;
