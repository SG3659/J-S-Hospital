const User = require("../Model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    //fetch  data
    const { username, email, password } = req.body;
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
      return res.status(500).json({
        success: false,
        message: "error in hashing pass ",
      });
    }
    // create
    const user = await User.create({
      username,
      email,
      password: hashpass,
    });
    return res.status(200).json({
      success: true,
      message: "User created successfully ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email",
      });
    }
    const storedHashedPassword = user.password;
    const isPasswordValid = await bcrypt.compareSync(
      password,
      storedHashedPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOCKEN);
    //const { password: pass, ...rest } = user;
    const { password: pass, ...rest } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "LoggedIN",
        ...rest,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be login, please try again later",
    });
  }
};
