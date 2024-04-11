const express = require("express");
const router = express.Router();
const {
  register,
  login,
  google,
  userinfo,
  doctors,
  markseen,
  markdelete,
  getAllDocotrsController,
  bookeAppointment,
  checkAvailability,
  userAppointments,
} = require("../Controller/userauth");

const { authMiddleware } = require("../middlewares/authMiddleware");
//LOGIN || POST
router.post("/register", register);
//REGISTER || POST
router.post("/login", login);
// Post signin eith google
router.post("/google", google);
// send email & name to the user after login
router.post("/get-user-info-by-id", authMiddleware, userinfo);
//Apply  Doctor || POST
router.post("/applydoctor", authMiddleware, doctors);
//Notification  Doctor || POST
router.post("/mark-all-notification-seen", markseen);
//Notification  Doctor || POST
router.post("/mark-all-notification-delete", markdelete);
// GET All DOC
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);
// Booke Appointment
router.post("/bookappointment", authMiddleware, bookeAppointment);
// appointment availability
router.post("/checkAvailability", authMiddleware, checkAvailability);

//Appointments List
router.get("/user-appointments", authMiddleware, userAppointments);
module.exports = router;
