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
