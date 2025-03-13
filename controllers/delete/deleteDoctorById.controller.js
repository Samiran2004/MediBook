import { getReasonPhrase, StatusCodes } from "http-status-codes";
import Models from "../../models/index.models.js";

const deleteDoctorByIdController = async (req, res) => {
    try {
        const { doctorid } = req.body;
        if (!doctorid) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: "Please provide the doctor's id!"
            });
        }
        try {
            await Models.DoctorModel.findByIdAndDelete(doctorid);
            return res.status(StatusCodes.OK).json({
                status: 'OK',
                message: "Doctor deleted!"
            });
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                status: 'Failed',
                message: `${doctorid} is not a valid doctor's id!`
            });
        }
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        });
    }
}

export default deleteDoctorByIdController;