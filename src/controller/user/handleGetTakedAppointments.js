const appointmentModel = require('../../models/appointmentModel');
const AppError = require('../../utils/AppError');

const handleGetTakedAppointments = async (req, res, next) => {
    try {
        const date = req.query.date;
        const doctorId = req.query.doctorId;
        if (!date || !doctorId) { throw new AppError(400, 'unexpected value') }
        const response = await appointmentModel.find({ date: date, doctorId: doctorId, status: { $ne: "canceled" } }, { time: true, _id: false }); // return only the slots that taked

        if (response) {
            return res.status(200).send(response);
        }
    } catch (err) {
        next(err);
    }

}

module.exports = handleGetTakedAppointments