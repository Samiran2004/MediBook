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
router.get('/health', (req, res, next) => {
    try {
        res.status(StatusCodes.OK).send({
            status: 'OK',
            message: "Server is Up and Running",
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: 'Failed',
        });
    }
});

/**
 * Signup
 * path: /api/v1/signup
 */
router.post('/signup', upload.single('profileimage'), controllers.SignUp);

/**
 * Login
 * path: /api/v1/login
 */
router.post('/login', controllers.Login);

/**
 * Logout
 * Path: /api/v1/logout
 */
router.get('/logout', (req, res) => {
    res.clearCookie().redirect('/');
});

/**
 * Update Doctor's Dets
 * Path: /api/v1/updateDetails
 */
router.post('/updateDetails', Middlewares.DoctorAuth('doctortoken'), controllers.UpdateDoctorDetails);

/**
 * Get all Doctors
 * Path: /api/v1/doctors
 * Body: isVerified: true or false
 */
// router.get('/doctors', Middlewares.UserAuth('usertoken'), controllers.GetAllDoctors);
router.get('/doctors', controllers.GetAllDoctors); // For testing

export default router;