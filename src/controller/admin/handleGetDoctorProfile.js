const doctorModel = require('../../models/doctorModel');
const AppError = require('../../utils/AppError');
const handleGetDoctorProfile = async (req, res, next) => {
    const doctorId = req.query._id;
    if (!doctorId) {
        throw new AppError(404, 'no specific doctor');
    }
    try {
        const profileResponse = await doctorModel.findById(doctorId);
        if (profileResponse) {
            return res.status(200).send(profileResponse);
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetDoctorProfile