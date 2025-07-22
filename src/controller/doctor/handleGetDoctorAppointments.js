const { startOfDay, endOfDay, parseISO } = require('date-fns');
const appointmentModel = require('../../models/appointmentModel');
const AppError = require('../../utils/AppError');
const ObjectId = require('mongoose').Types.ObjectId;
const { formatInTimeZone, getTimezoneOffset, toZonedTime, format, fromZonedTime } = require('date-fns-tz')

const handleGetDoctorAppointments = async (req, res, next) => {
    const doctorId = res.locals.id;
    const date = req.query.date;
    const zoneTime="Asia/Damascus"
    try {
        if (!date) { throw new AppError(404, 'no specific date'); }
        const isoDate = parseISO(date);
        const utc = toZonedTime(isoDate,zoneTime)
        const start = startOfDay(utc);
        const end = endOfDay(utc)
        const response = await appointmentModel.aggregate([
            { $match: { doctorId: new ObjectId(doctorId), date: { $gte: start, $lte: end } } },
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
