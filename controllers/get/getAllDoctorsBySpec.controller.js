import { StatusCodes } from "http-status-codes";

const getAllDoctoreBySpec = async (req, res, next) => {
    try {
        const { specialization, isVerified } = req.body;
        if(isVerified) {
            return res.status()
        }
        return res.status(StatusCodes.OK).json({
            status: 'OK',
            message: "All Doctors by Spec!"
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error!"
        });
    }
}

export default getAllDoctoreBySpec;