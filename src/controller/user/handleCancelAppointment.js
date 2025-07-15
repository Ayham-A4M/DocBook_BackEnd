const appointmentModel = require('../../models/appointmentModel');
const AppError = require('../../utils/AppError');
const handleCancelAppointment = async (req, res, next) => {

    try {
        const appointmentId = req.body.appointmentId;
        if (!appointmentId) { throw new AppError(404, 'no specific appointment') }
        const response = await appointmentModel.findByIdAndUpdate(appointmentId, { status: 'canceled' })
        if (response) {
            return res.status(200).send({ msg: 'appointment canceled' });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleCancelAppointment