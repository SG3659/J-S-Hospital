const express = require("express");
const router = express.Router();
const {
  register,
  login,
  userinfo,
  doctors,
  markseen,
  markdelete,
} = require("../Controller/userauth");

const { authMiddleware } = require("../middlewares/authMiddleware");
//LOGIN || POST
router.post("/register", register);
//REGISTER || POST
router.post("/login", login);
// send email & name to the user after login
router.post("/get-user-info-by-id", authMiddleware, userinfo);
//Apply  Doctor || POST
router.post("/applydoctor", authMiddleware, doctors);
//Notifiaction  Doctor || POST
router.post("/mark-all-notification-seen", markseen);
//Notifiaction  Doctor || POST
router.post("/mark-all-notification-delete", markdelete);



module.exports = router;
