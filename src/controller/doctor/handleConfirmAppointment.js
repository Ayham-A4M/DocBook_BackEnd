const reportModel = require('../../models/reportModel');
const doctorModel = require('../../models/doctorModel');
const appointmentModel = require('../../models/appointmentModel');
const AppError = require('../../utils/AppError');
const handleConfirmAppointment = async (req, res, next) => {

    const { report, appointmentId } = req.body;

    const doctorId = res.locals.id;

    try {
        if (!appointmentModel || !report) { throw new AppError(400, 'unexpected value') }
        report.appointmentId = appointmentId;
        report.doctorId = doctorId;
        const appointmentResponse = await appointmentModel.findByIdAndUpdate(appointmentId, { status: 'confirmed' });

        const doctorResponse = await doctorModel.findByIdAndUpdate(doctorId, { $inc: { treatmentsNumber: 1 } });

        const newReport = new reportModel(report);
        const reportResponse = await newReport.save();

        return res.status(200).send({ msg: 'report submited kepp going' });

    }
    catch (err) {
        next(err);
    }



}
module.exports = handleConfirmAppointment