import logincontroller from "./auth/login.auth.controller.js";
import signupController from "./auth/signup.auth.controller.js";
import doctorDashboardController from "./dash/doctor.dash.controller.js";

const controllers = {
    SignUp: signupController,
    Login: logincontroller,
    DoctorDashboard: doctorDashboardController
}

export default controllers;