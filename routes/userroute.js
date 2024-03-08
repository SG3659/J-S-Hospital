const express=require('express');
const router=express.Router();
const {register,login, userinfo }=require("../Controller/userauth")
const {authMiddleware} =require("../middlewares/authMiddleware")

router.post('/register', register)
router.post('/login',login);
router.post('/get-user-info-by-id',authMiddleware,userinfo)
module.exports =router;