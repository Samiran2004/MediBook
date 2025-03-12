import logincontroller from "./auth/login.auth.controller.js";
import signupController from "./auth/signup.auth.controller.js";
import doctorDashboardController from "./dash/doctor.dash.controller.js";
import getAllDoctors from "./get/getAllDoctors.controller.js";
import getAllDoctoreBySpec from "./get/getAllDoctorsBySpec.controller.js";
import UpdateDoctorDetailsController from "./update/updateDoctorDetails.controller.js";

const controllers = {
    SignUp: signupController,
    Login: logincontroller,
    DoctorDashboard: doctorDashboardController,
    UpdateDoctorDetails: UpdateDoctorDetailsController,
    GetAllDoctors: getAllDoctors,
    GetAllDoctorsBySpec: getAllDoctoreBySpec
}

export default controllers;