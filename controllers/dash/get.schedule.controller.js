import { StatusCodes } from "http-status-codes";
import Schedule from "../../models/Schedule.model.js";

const getDoctorSchedule = async function (req, res, next) {
  try {
    const doctorId = req.user?.id || req.doctor?._id;

    if (!doctorId) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        status: "Failed",
        message: "Doctor ID not found in request",
      });
    }

    const schedule = await Schedule.findOne({ doctorId });

    if (!schedule) {
      return res.status(StatusCodes.OK).json({
        status: "Success",
        message: "No schedule found",
        data: null,
      });
    }

    return res.status(StatusCodes.OK).json({
      status: "Success",
      message: "Schedule fetched successfully",
      data: schedule,
    });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "Failed",
      message: "Error fetching schedule",
      error: err.message,
    });
  }
};

export default getDoctorSchedule;
