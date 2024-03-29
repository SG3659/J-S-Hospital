const Appointment = require("../Model/appointmentModel");
const Doctor = require("../Model/doctormodel");
const User = require("../Model/userModel");
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

exports.getdoctorid = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).json({
      success: true,
      message: "single doc   successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
};

exports.gedoctorappointment = async (req, res, next) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    const appointment = await Appointment.find({ doctorId: doctor._id });
    res.status(200).json({
      success: true,
      message: "Doctor Appointment Successfully",
      data: appointment,
    });
  } catch (error) {
    next(error);
  }
};
exports.docupdatestatus = async (req, res) => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await Appointment.findByIdAndUpdate(appointmentsId, {
      status,
    });
    const user = await User.findOne({ _id: appointments.userId });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "status-updated",
      message: `your appointment has been updated ${status}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "appointment updated successfully ",
    });
  } catch (error) {
    next(error);
  }
};
