import JWT from 'jsonwebtoken';
import Models from '../models/index.models.js';
import { StatusCodes } from 'http-status-codes';
import configs from '../configs/index.configs.js';

function doctorauthmiddleware(token) {
    return async (req, res, next) => {
        try {
          const tokenValue = req.cookies[token];

          if (!tokenValue) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
              status: "Failed",
              message: "Token not found!",
            });
          }

          const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);

          if (!userPayload || !userPayload._id) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
              status: "Failed",
              message: "Invalid token payload",
            });
          }

          // For Doctor...
          if (userPayload.role === "doctor") {
            // Set both req.user and req.doctor for compatibility
            req.user = {
              id: userPayload._id,
              role: userPayload.role,
            };
            req.doctor = userPayload;
            res.locals.doctor = userPayload;
            return next();
          }

          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: "Failed",
            message: "Access denied. Only doctors can access this route.",
          });
        } catch (error) {
          console.error("Auth Middleware Error:", error);
          return res.status(StatusCodes.UNAUTHORIZED).json({
            status: "Failed",
            message: "Authentication failed",
            error: error.message,
          });
        }
    }
}

export default doctorauthmiddleware;