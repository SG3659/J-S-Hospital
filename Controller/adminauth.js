const User = require("../Model/userModel");
const Doctor = require("../Model/doctormodel");
exports.getusers = async (req, res, next) => {
  try {
    const users = await User.find({});
    users.password = undefined;
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: users,
    });
  } catch (error) {
    next(error);
  }
};
exports.getdoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({});
    doctors.password = undefined;
    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully",
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
};
exports.accountstatus = async (req, res, next) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, { status });
    const user = await User.findOne({ _id: doctor.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "doctor-account-request-updated",
      message: `Your Doctor Account Request Has ${status} `,
      onClickPath: "/notification",
    });
    user.isDoctor === "aprroved" ? true : false;
    user.save();
    res.status(201).json({
      success: true,
      message: "Status Updated",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};
