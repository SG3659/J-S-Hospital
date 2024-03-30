const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  getusers,
  getdoctors,
  accountstatus,
} = require("../Controller/adminauth");
//GET METHOD || USERS
router.get("/get-all-user", authMiddleware, getusers);
//GET METHOD || DOCTORS
router.get("/get-all-doctor", authMiddleware, getdoctors);
// Account status
router.post("/change-Account-status", authMiddleware, accountstatus);
module.exports = router;