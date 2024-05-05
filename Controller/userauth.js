const User = require("../Model/userModel");
const Doctor = require("../Model/doctormodel");
const Appointment = require("../Model/appointmentModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

exports.register = async (req, res) => {
  try {
    //fetch  data
    const { username, email, password } = req.body;
    // user already exists
    const userexisting = await User.findOne({ email });
    if (userexisting) {
      return res.status(500).send({
        success: false,
        message: "User already exists",
      });
    }
    // pass secure
    let hashpass;
    try {
      hashpass = await bcrypt.hashSync(password, 10);
    } catch (error) {
      return res.status(500).send({
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
    return res.status(200).send({
      success: true,
      message: "User created successfully ",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};
exports.login = async (req, res) => {
  try {
    //fetch data
    const { email, password } = req.body;
    //check user existence
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "Invalid email",
      });
    }
    // checking the pass word
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    } else {
      // token generate
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOCKEN, {
        expiresIn: "1d",
      });
      //const { password: pass, ...rest } = user;
      const { password: pass, ...rest } = user._doc; // not send the password

      // store token in cookies
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .send({
          success: true,
          message: "LoggedIn",
          data: token,
          ...rest,
        });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.userinfo = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(401).send({
        success: false,
        message: "user does not exist",
      });
    } else {
      res.status(200).send({
        success: true,
        //data:{name:user.name,email: user.email}
        data: user, // all login user data pass accept password
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.doctors = async (req, res, next) => {
  try {
    const newdoctor = new Doctor({ ...req.body, status: "pending" });
    await newdoctor.save();
    const adminUser = await User.findOne({ isAdmin: true });

    if (!adminUser) {
      return res.status(404).send({
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
      onClickPath: "/admin/doctors",
    });

    // useennotification update
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });

    return res.status(200).send({
      success: true,
      message: "Doctor account applied Successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.markseen = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    const unseenNotifications = user.unseenNotifications;
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updatedUser = await user.save();
    updatedUser.password = undefined;

    return res.status(200).send({
      success: true,
      message: "Seen",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.markdelete = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    user.unseenNotifications = [];
    user.seenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    return res.status(200).send({
      success: true,
      message: "All Delete",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Doctor List fetched ",
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.bookeAppointment = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "New Appointment Request",
      message: `A new Appointment from ${req.body.userInfo.username}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment book successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.checkAvailability = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromtime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const totime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: {
        $gte: fromtime,
        $lte: totime,
      },
    });

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Available at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        message: "Appointments Available ",
        success: true,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};

exports.userAppointments = async (req, res) => {
  try {
    const appointment = await Appointment.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Appointment fetch successfully",
      data: appointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
    });
  }
};
