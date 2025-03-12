import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Models from "../../models/index.models.js";
import configs from "../../configs/index.configs.js";

const logincontroller = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            // return res.status(StatusCodes.BAD_REQUEST).json({
            //     status: 'Failed',
            //     message: "All fields are required!"
            // });
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.BAD_REQUEST) });
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
                    email: User.email,
                    role: "user"
                }
                const token = await JWT.sign(playLoad, configs.JWT_SECRET, { expiresIn: '1h' });
                return res.status(StatusCodes.ACCEPTED).json({
                    status: 'OK',
                    message: "Successfully Logedin!",
                    token: token
                });
            }
            // return res.status(StatusCodes.UNAUTHORIZED).json({
            //     status: 'Failed',
            //     message: "Invalid Email or Password!"
            // });
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        }

        // Check if Doctor or not...
        const Doctor = await Models.DoctorModel.findOne({ email: email });
        if (Doctor && Doctor !== null) {
            // Validate Password...
            const isValidPassword = await bcrypt.compare(password, Doctor.password);
            if (isValidPassword) {
                const playLoad = {
                    _id: Doctor._id,
                    name: Doctor.name,
                    email: Doctor.email,
                    RegId: Doctor.registrationId,
                    isVerified: Doctor.isVerified,
                    specialization: Doctor.specialization,
                    profileimage: Doctor.profilepic,
                    address: Doctor.address,
                    role: "doctor",
                };
                // Create token...
                const token = await JWT.sign(playLoad, configs.JWT_SECRET);
                // return res.status(StatusCodes.ACCEPTED).json({
                //     status: 'OK',
                //     message: 'Successfully Logedin!',
                //     token: token
                // });
                res.cookie('doctortoken', token).redirect('/doctorDash');
                return;
            }
            // return res.status(StatusCodes.UNAUTHORIZED).json({
            //     status: 'Failed',
            //     message: "Invalid Email or Password!"
            // });
            return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        }

        // return res.status(StatusCodes.CONFLICT).json({
        //     status: 'Failed',
        //     message: "Invalid Email or Password!"
        // });
        return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.CONFLICT) });
    } catch (error) {
        // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        //     status: 'Failed',
        //     message: "Internal Server Error!"
        // });
        return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}

export default logincontroller;