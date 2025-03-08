/**
 * Signup controller
 */

import { StatusCodes } from "http-status-codes"

const signupController = async(req, res, next)=>{
    try {
        console.log("Signup Successfull");
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            status: 'Failed'
        });
    }
}

export default signupController;