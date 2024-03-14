const express = require("express");
const router = express.Router();
const {
  register,
  login,
  userinfo,
  doctors,
} = require("../Controller/userauth");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.post("/applydoctor", authMiddleware, doctors);
// send email & name to the user after login 
router.post("/get-user-info-by-id", authMiddleware, userinfo);
module.exports = router;
