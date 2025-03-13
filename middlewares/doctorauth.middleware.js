import JWT from 'jsonwebtoken';
import Models from '../models/index.models.js';
import { StatusCodes } from 'http-status-codes';
import configs from '../configs/index.configs.js';

function doctorauthmiddleware(token) {
    return async (req, res, next) => {
        try {
          const tokenValue = req.cookies[token];

          if (!tokenValue) {
            // return res.status(StatusCodes.UNAUTHORIZED).json({
            //   status: "Failed",
            //   message: "Token not found!",
            // });
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
          }

          const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);

          if (!userPayload || !userPayload._id) {
            // return res.status(StatusCodes.UNAUTHORIZED).json({
            //   status: "Failed",
            //   message: "Invalid token payload",
            // });
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
          }

          // For Doctor...
          if (userPayload.role === "doctor") {
            // Set req.doctor
            req.user = {
              id: userPayload._id,
              role: userPayload.role,
            };
            req.doctor = userPayload;
            res.locals.doctor = userPayload;
            return next();
          }

          // return res.status(StatusCodes.UNAUTHORIZED).json({
          //   status: "Failed",
          //   message: "Access denied. Only doctors can access this route.",
          // });
          return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        } catch (error) {
          console.error("Auth Middleware Error:", error);
          // return res.status(StatusCodes.UNAUTHORIZED).json({
          //   status: "Failed",
          //   message: "Authentication failed",
          //   error: error.message,
          // });
          return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
        }
    }
}

export default doctorauthmiddleware;