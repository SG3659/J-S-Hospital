const User = require("../Model/userModel");
const Doctor = require("../Model/doctormodel");
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
    // checking the pass word
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
    // token generate
    const token = jwt.sign({ id: user._id }, process.env.JWT_TOCKEN);
    //const { password: pass, ...rest } = user;
    const { password: pass, ...rest } = user._doc; // not send the password

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({
        success: true,
        message: "LoggedIN",
        data: token,
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

exports.userinfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user does not exist",
      });
    } else {
      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error getting user info ",
    });
  }
};

exports.doctors = async (req, res) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "No admin user found",
      });
    }

    //admin unseennotification
    const unseenNotifications = adminUser.unseenNotifications || [];
    unseenNotifications.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account `,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath:"/admin/doctors",
    });

    // useennotification update
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

    return res.status(200).json({
      success: true,
      message: "Doctor account applied Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
