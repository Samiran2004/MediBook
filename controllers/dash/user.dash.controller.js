import { getReasonPhrase, StatusCodes } from "http-status-codes";

const userDashboardController = async (req, res) => {
    try {
        return res.render('patientDashboard');
    } catch (error) {
        return res.render('errorpage', { errorMessage: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR) });
    }
}

export default userDashboardController;