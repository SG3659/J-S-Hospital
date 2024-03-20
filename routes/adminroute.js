const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getusers, getdoctors } = require("../Controller/adminauth");

router.get("/get-all-user", authMiddleware, getusers);
router.get("/get-all-doctor", authMiddleware, getdoctors);

module.exports = router;
