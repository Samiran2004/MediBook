import { getReasonPhrase, StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Models from "../../models/index.models.js";
import configs from "../../configs/index.configs.js";

const logincontroller = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.render("errorpage", {
                errorMessage: getReasonPhrase(StatusCodes.BAD_REQUEST),
            });
        }

        // ✅ Check if User
        const User = await Models.UserModel.findOne({ email });
        if (User) {
            const isPasswordMatch = await bcrypt.compare(password, User.password);
            if (isPasswordMatch) {
                const playLoad = {
                    name: User.name,
                    email: User.email,
                    role: "user",
                };
                const token = await JWT.sign(playLoad, configs.JWT_SECRET, { expiresIn: "1h" });
                return res.cookie("usertoken", token, { httpOnly: true }).redirect("/userDashboard");
            }
            return res.render("errorpage", { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        }

        // ✅ Check if Doctor
        const Doctor = await Models.DoctorModel.findOne({ email });
        if (Doctor) {
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
                const token = await JWT.sign(playLoad, configs.JWT_SECRET);
                return res.cookie("doctortoken", token, { httpOnly: true }).redirect("/doctorDash");
            }
            return res.render("errorpage", { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        }

        // ✅ Check if Admin
        const Admin = await Models.AdminModel.findOne({ email });
        if (Admin) {
//             console.log("Admin Found:", Admin);
//             console.log("Entered Password:", password);
//             console.log("Stored Password:", Admin.password);

            // If Admin password is hashed, use bcrypt.compare
//             const isPasswordMatch = await bcrypt.compare(password, Admin.password);
            if (password == Admin.password) {
                const playLoad = {
                    _id: Admin._id,
                    name: Admin.name,
                    email: Admin.email,
                };
                const token = await JWT.sign(playLoad, configs.JWT_SECRET);
                return res.cookie("admintoken", token, { httpOnly: true }).redirect("/adminDash");
            }
            return res.render("errorpage", { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });
        }

        return res.render("errorpage", { errorMessage: getReasonPhrase(StatusCodes.UNAUTHORIZED) });

    } catch (error) {
        console.error("Login Error:", error);
        return res.render("errorpage", { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
};

export default logincontroller;