import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Models from "../../models/index.models.js";
import configs from "../../configs/index.configs.js";

const logincontroller = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "All fields are required!"
            });
        }

        // Check if user or not...
        const User = await Models.UserModel.findOne({ email: email });
        if (User && User !== null) {
            // Check Password...
            const hashed_password = User.password;
            const isPasswordMatch = await bcrypt.compare(password, hashed_password);
            if (isPasswordMatch) {
                const playLoad = {
                    name: User.name,
                    email: User.email
                }
                const token = await JWT.sign(playLoad, configs.JWT_SECRET, { expiresIn: '1h' });
                return res.status(StatusCodes.ACCEPTED).json({
                    status: 'OK',
                    message: "Successfully Loggedin!",
                    token: token
                });
            }
            return res.status(StatusCodes.UNAUTHORIZED).json({
                status: 'Failed',
                message: "Invalid Email or Password!"
            });
        }

        // Check if Doctor or not...
        const Doctor = await Models.DoctorModel.findOne({ email: email });
        if (Doctor && Doctor !== null) {

        }

        return res.status(StatusCodes.CONFLICT).json({
            status: 'Failed',
            message: "Invalid Email or Password!"
        })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error!"
        });
    }
}

export default logincontroller;