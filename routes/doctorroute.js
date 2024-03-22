const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const { getdoctorinfo ,updateprofile} = require("../Controller/doctorauth");

// get doctor route
router.post("/get-doctor-info", authMiddleware, getdoctorinfo);
// update doctor profile
router.post("/update-doctor-profile", authMiddleware, updateprofile);
module.exports = router;
