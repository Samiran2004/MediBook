import logincontroller from "./auth/login.auth.controller.js";
import signupController from "./auth/signup.auth.controller.js";

const controllers = {
    SignUp: signupController,
    Login: logincontroller
}

export default controllers;