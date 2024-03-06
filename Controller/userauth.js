const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    //fetch  data
    const {name, email, password} = req.body;
    // user already exists
    const userexisting = await User.findOne({ email });
    if (userexisting) {
      return res.status(500).json({
        success: false,
        message: "User already exists",
      });
    }
    // pass secure
    let hashpass;
    try {
      hashpass = await bcrypt.hashSync(password, 10);
    } catch (error) {
      return res(500).json({
        success: false,
        message: "error in hashing pass ",
      });
    }
    // create
    const user = await User.create({
      name,
      email,
      password: hashpass,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};
