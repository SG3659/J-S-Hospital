const User = require("../Model/userModel");
const Doctor = require("../Model/doctormodel");
exports.getusers = async (req, res) => {
  try {
    const users = await User.find({});
    users.password = undefined;
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.getdoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    doctors.password = undefined;
    res.status(200).json({
      success: true,
      message: "Doctor fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
exports.accountstatus = async (req, res) => {
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
    user.isDoctor = status === "aprroved" ? true : false;
    await user.save();
    res.status(201).json({
      success: true,
      message: "Status Updated",
      data: doctor,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
