import { getReasonPhrase, StatusCodes } from "http-status-codes";
import configs from "../configs/index.configs.js";

function adminauthMiddleware(token) {
    return async (req, res, next) => {
        try {
            const tokenValue = req.cookies[token];
            if (!tokenValue) {
                return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
            }
            const adminPayload = JWT.verify(tokenValue, configs.JWT_SECRET);
            if (!adminPayload || !adminPayload._id) {
                return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
            }
            if (adminPayload.role === "admin") {
                // Set req.admin
                req.user = {
                    id: userPayload._id,
                    role: userPayload.role,
                };
                req.admin = adminPayload;
                res.locals.admin = adminPayload;
                return next();
            }
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        } catch (error) {
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
        }
    }
}

export default adminauthMiddleware;