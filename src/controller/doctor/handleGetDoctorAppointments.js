const { startOfDay, endOfDay, parseISO } = require('date-fns');
const appointmentModel = require('../../models/appointmentModel');
const AppError = require('../../utils/AppError');
const ObjectId = require('mongoose').Types.ObjectId;
const { formatInTimeZone, getTimezoneOffset, toZonedTime, format, fromZonedTime } = require('date-fns-tz')

const handleGetDoctorAppointments = async (req, res, next) => {
    const doctorId = res.locals.id;
    const date = req.query.date;

    try {
        if (!date) { throw new AppError(404, 'no specific date'); }
        const startUTC = toZonedTime(startOfDay(date));
        const endUTC = toZonedTime(endOfDay(date));
        const response = await appointmentModel.aggregate([
            { $match: { doctorId: new ObjectId(doctorId), date: { $gte: startUTC, $lte: endUTC } } },
            // { $match: { doctorId: new ObjectId(doctorId), date: { $gte: startOfDay(date), $lte: endOfDay(date) } } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userInformation'
                }
            },
            {
                $unwind: "$userInformation"
            },
            {
                $project: {
                    patientName: "$userInformation.fullName",
                    reason: true,
                    time: true,
                    status: true,
                }
            }
        ]);

        return res.status(200).send(response);
    } catch (err) {
        next(err);
    }

}
module.exports = handleGetDoctorAppointments
