import logincontroller from "./auth/login.auth.controller.js";
import signupController from "./auth/signup.auth.controller.js";
import doctorDashboardController from "./dash/doctor.dash.controller.js";
import UpdateDoctorDetailsController from "./update/updateDoctorDetails.controller.js";
>>>>>>> ccf01f0bd71a2f00a6fa08f1bbaca47b7a3b5862

const controllers = {
    SignUp: signupController,
    Login: logincontroller,
    DoctorDashboard: doctorDashboardController,
    UpdateDoctorDetails: UpdateDoctorDetailsController,
}

export default controllers;