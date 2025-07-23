const { format, endOfMonth } = require('date-fns')
const doctorModel = require('../../models/doctorModel');
const holidayModel = require('../../models/holidayModel');
const AppError = require('../../utils/AppError');
const handleGetDoctorById = async (req, res, next) => {
    try {
        const id = req.query._id;
        if (!id) { throw new AppError(404, 'no specific doctor') }
        const response = await doctorModel.findById(id, { password: false, tokenVersion: false });
        const nextHolidays = await holidayModel.find({ date: { $gte: format(new Date(),'yyyy-MM-dd'), $lte: format(endOfMonth(new Date()),'yyyy-MM-dd') } }, { date: true }); // just for 7 days

        if (response) {
            return res.status(200).send({ doctorInformation: response, nextHolidays });
        }

    } catch (err) {
        next(err)
    }
}
module.exports = handleGetDoctorById