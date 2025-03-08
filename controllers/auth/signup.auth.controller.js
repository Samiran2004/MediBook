/**
 * Signup controller
 */

import { StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";
import bcrypt from "bcrypt";
import configs from "../../configs/index.configs.js";
import clodinary from "../../services/cloudinary.js";
import fs from "fs";

const signupController = async (req, res, next) => {
    try {
        // Check role...
        let role = typeof req.body.role === "string" ? req.body.role.toLowerCase() : "";

        if (role === 'doctor') {
            const { name,
                email,
                phonenumber,
                password,
                specialization,
                registrationId
            } = req.body;

            if (!name || !email || !phonenumber || !password || !specialization || !registrationId) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    status: 'Failed',
                    message: "Please enter all required fields!"
                });
                return;
            }

            if (!specialization.every(spec => typeof spec === "string")) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    status: 'Failed',
                    message: "specialization should be an array!"
                });
                return;
            }

            // Check email is exist in database or not...
            const Doctor = await Models.DoctorModel.findOne({
                email: email,
            });

            if (Doctor) {
                res.status(StatusCodes.BAD_REQUEST).send({
                    status: 'Failed',
                    message: "Doctor already exists!"
                });
                return;
            }

            // Hash password...
            const hashed_password = await bcrypt.hash(password, configs.SALT);
            phonenumber = parseInt(phonenumber);

            // Upload profile picture in cloudinary...
            let profileimage_url = "";
            if (req.file) {
                try {
                    let uploadImageUrl = await clodinary.uploader.upload(req.file.path);
                    fs.unlinkSync(req.file.path);
                    profileimage_url = uploadImageUrl.secure_url;
                } catch (error) {
                    res.status(StatusCodes.BAD_REQUEST).send({
                        status: 'Failed',
                        message: "Something Went Wrong in Cloudinary!"
                    });
                }
            }

            const newDoctor = new Models.DoctorModel({
                name: name,
                email: email,
                phonenumber: phonenumber,
                password: hashed_password,
                profilepic: profileimage_url
            });

            if (Array.isArray(specialization)) {
                newDoctor.specialization.push(...specialization);
            } else if (typeof specialization == 'string') {
                newDoctor.specialization.push(specialization);
            }

            await newDoctor.save();


        } else if (role === 'user') {
            console.log("Signup for user...");
        } else {
            console.log("Signup error, Not provide a valid role...");
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: 'Failed'
        });
    }
}

export default signupController;