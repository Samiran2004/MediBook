import { StatusCodes } from "http-status-codes";
import JWT from 'jsonwebtoken';
import configs from "../configs/index.configs.js";

function userauthmiddleware(token) {
    return async (req, res, next) => {
        try {
            const tokenValue = req.cookies[token];
            if (!tokenValue) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    status: 'Failed',
                    message: "Token not found!"
                });
            } else {
                try {
                    const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);

                    // For Doctor...
                    if (userPayload.role === 'user') {
                        return next();
                    }
                    return next();
                } catch (error) {
                    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                        status: 'Failed',
                        message: "Internal Server Error!"
                    });
                }
            }
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: 'Failed',
                message: "Internal Server Error!"
            });
        }
    }
}

export default userauthmiddleware;