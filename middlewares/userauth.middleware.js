import JWT from 'jsonwebtoken';
import Models from '../models/index.models.js';
import { StatusCodes } from 'http-status-codes';
import configs from '../configs/index.configs.js';

function userauthmiddleware(token) {
    return async (req, res, next) => {
        const tokenValue = req.cookies[token];
        if (!tokenValue) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'Failed',
                message: "Token not found!"
            });
        } else {
            try {
                const userPayload = JWT.verify(tokenValue, configs.JWT_SECRET);
                console.log(userPayload);
                return next();
            } catch (error) {
                res.status(StatusCodes.UNAUTHORIZED).json({
                    status: 'Failed',
                    message: "Token verification error..."
                })
            }
        }
    }
}

export default userauthmiddleware;