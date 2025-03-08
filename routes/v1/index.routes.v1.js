import express from "express";
import { StatusCodes } from "http-status-codes";
const router = express.Router();
import controllers from "../../controllers/index.controllers.js";
import upload from "../../middlewares/multer.middleware.js";

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

export default router;