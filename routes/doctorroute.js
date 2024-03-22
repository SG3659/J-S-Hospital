const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const { getdoctorinfo ,updateprofile,getdoctorid} = require("../Controller/doctorauth");

// get doctor route
router.post("/get-doctor-info", authMiddleware, getdoctorinfo);
// update doctor profile
router.post("/update-doctor-profile", authMiddleware, updateprofile);
// get doctor by id
router.post("/get-doctor-id", authMiddleware, getdoctorid);

module.exports = router;
