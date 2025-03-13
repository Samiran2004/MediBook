import logincontroller from "./auth/login.auth.controller.js";
import signupController from "./auth/signup.auth.controller.js";
import doctorDashboardController from "./dash/doctor.dash.controller.js";
import updateDoctorDetailsController from "./update/update.Doctor.Details.controller.js";
import updateDoctorSchedule from "./update/update.schedule.controller.js";
import getDoctorSchedule from "./dash/get.schedule.controller.js";
import getAllDoctors from "./get/getAllDoctors.controller.js";
import getAllDoctoreBySpec from "./get/getAllDoctorsBySpec.controller.js";
import bookAppointment from "./appointment/book.appointment.controller.js";
import getAllUsers from "./get/getAllUsers.controller.js";

const controllers = {
  SignUp: signupController,
  Login: logincontroller,
  DoctorDashboard: doctorDashboardController,
  UpdateDoctorDetails: updateDoctorDetailsController,
  SignUp: signupController,
  Login: logincontroller,
  DoctorDashboard: doctorDashboardController,
  UpdateDoctorDetails: updateDoctorDetailsController,
  UpdateDoctorSchedule: updateDoctorSchedule,
  GetDoctorSchedule: getDoctorSchedule,
  GetAllDoctors: getAllDoctors,
  GetAllDoctorsBySpec: getAllDoctoreBySpec,
  BookAppointment: bookAppointment,
  GetAllUsers: getAllUsers
};

export default controllers;