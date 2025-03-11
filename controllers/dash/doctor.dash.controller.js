import { StatusCodes } from "http-status-codes"
import Models from "../../models/index.models.js";

const doctorDashboardController = async (req, res, next) => {
    try {
        console.log(req.doctor);
        const Doctor = await Models.DoctorModel.findOne({ email: req.doctor.email });
        console.log(Doctor);
        return res.render('docDashboard', {
            languages: Doctor.languages,
            education: Doctor.education,
            consultationFee: Doctor.consultationFee,
            facts: Doctor.facts
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'Failed',
            message: "Internal Server Error!"
        });
    }
}

export default doctorDashboardController;