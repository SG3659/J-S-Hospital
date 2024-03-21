const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();
const { getdoctorinfo } = require("../Controller/doctorauth");

// get doctor route
router.post("/get-doctor-info", authMiddleware, getdoctorinfo);
module.exports = router;
