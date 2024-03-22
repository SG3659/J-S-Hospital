const User = require("../Model/userModel");
const Doctor = require("../Model/doctormodel");
exports.getdoctorinfo = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    res.status(200).json({
      success: true,
      message: "Doctor data  fetched successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};
exports.updateprofile = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Doctor profile update  successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};
