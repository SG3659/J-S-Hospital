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
