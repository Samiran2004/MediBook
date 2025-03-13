import express from "express";
import { StatusCodes } from "http-status-codes";
const router = express.Router();
import controllers from "../../controllers/index.controllers.js";
import upload from "../../middlewares/multer.middleware.js";
import Middlewares from "../../middlewares/index.middleware.js";

/**
 * Check health...
 * path: /api/v1/health
 */
router.get("/health", (req, res, next) => {
  try {
    res.status(StatusCodes.OK).send({
      status: "OK",
      message: "Server is Up and Running",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "Failed",
    });
  }
});

/**
 * Signup
 * path: /api/v1/signup
 */
router.post("/signup", upload.single("profileimage"), controllers.SignUp);

/**
 * Login
 * path: /api/v1/login
 */
router.post("/login", controllers.Login);

/**
 * Logout
 * Path: /api/v1/logout
 */
router.get("/logout", (req, res) => {
  res.clearCookie().redirect("/");
});

router.post(
  "/updateSchedule",
  Middlewares.DoctorAuth("doctortoken"),
  controllers.UpdateDoctorSchedule
);

router.get(
  "/getSchedule",
  Middlewares.DoctorAuth("doctortoken"),
  controllers.GetDoctorSchedule
);

/**
 * Update Doctor's Dets
 * Path: /api/v1/updateDetails
 */
router.post(
  "/updateDetails",
  Middlewares.DoctorAuth("doctortoken"),
  controllers.UpdateDoctorDetails
);

/**
 * Get all Doctors
 * Path: /api/v1/doctors
 * Body: isVerified: true or false
 */
// router.get('/doctors', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctors);
router.get('/doctors', controllers.GetAllDoctors); // For testing

/**
 * Get all doctors by spec
 * Path: /api/v1/doctors/specality
 * Body: specality and isVerified: true or false
 */
router.get('/doctors/specality', controllers.GetAllDoctorsBySpec); // For testing
// router.get('/doctors/specality', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctorsBySpec);

/**
 * Book an appointment
 * Path: /api/v1/appoint/book
 */
router.post('/appoint/book', controllers.BookAppointment);

/**
 * Get all users
 * Path: /api/v1/users
 * Body: userid if get user by id
 */
router.get('/users', controllers.GetAllUsers);

export default router;