/**
 * Signup controller
 */

import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcryptjs"
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";

const signupController = async (req, res, next) => {
    try {
        let role = typeof req.body.role === "string" ? req.body.role.toLowerCase() : "";

        if (role === 'doctor') {
            const { name, email, phonenumber, password, specialization, registrationId } = req.body;

            if (!name || !email || !phonenumber || !password || !specialization || !registrationId) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'Failed',
                    message: "Please enter all required fields!"
                });
            }

            // Check if doctor already exists
            const existingDoctor = await Models.DoctorModel.findOne({ email });

            if (existingDoctor) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    status: 'Failed',
                    message: "Doctor already exists!"
                });
            }

            // Hash password
            const hashed_password = await bcrypt.hash(password, Number(configs.SALT));

            // Upload profile picture to Cloudinary
            let profileimage_url = "";
            if (req.file) {
                try {
                    let uploadImageUrl = await clodinary.uploader.upload(req.file.path);
                    fs.unlinkSync(req.file.path);
                    profileimage_url = uploadImageUrl.secure_url;
                } catch (error) {
                    return res.status(StatusCodes.BAD_REQUEST).json({
                        status: 'Failed',
                        message: "Something Went Wrong in Cloudinary!"
                    });
                }
            }

            // Create new doctor instance
            const newDoctor = new Models.DoctorModel({
                name,
                email,
                phonenumber,
                password: hashed_password,
                profilepic: profileimage_url,
                specialization,
                registrationId
            });

            // Save to DB
            await newDoctor.save();

            return res.status(StatusCodes.CREATED).json({
                status: 'OK',
                message: "Successfully Signed Up!",
                data: newDoctor
            });
        }else if(role === 'user') {
            return res.status(StatusCodes.CREATED).json({
                status: "OK",
                message: "User created..."
            })
        }
        
        // If role is not doctor
        return res.status(StatusCodes.BAD_REQUEST).json({
            status: 'Failed',
            message: "Not a valid role"
        });

    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error"
        });
    }
};

export default signupController;