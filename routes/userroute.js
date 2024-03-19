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

router.post("/register", register);
router.post("/login", login);
// send email & name to the user after login
router.post("/get-user-info-by-id", authMiddleware, userinfo);
router.post("/applydoctor", authMiddleware, doctors);
router.post("/mark-all-notification-seen", markseen);
router.post("/mark-all-notification-delete", markdelete);
module.exports = router;
