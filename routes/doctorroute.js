const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const {
  getdoctorinfo,
  updateprofile,
  getdoctorid,
  gedoctorappointment,
  docupdatestatus,
} = require("../Controller/doctorauth");

// get doctor route
router.post("/get-doctor-info", authMiddleware, getdoctorinfo);
// update doctor profile
router.post("/update-doctor-profile", authMiddleware, updateprofile);
// post get doctor by id
router.post("/get-doctor-id", authMiddleware, getdoctorid);
// get Doctor appointment
router.get("/doctor-appointment", authMiddleware, gedoctorappointment);
// post update Status
router.post("/docupdate-status", authMiddleware, docupdatestatus);
module.exports = router;
