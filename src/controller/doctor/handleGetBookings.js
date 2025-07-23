const appointmentModel = require('../../models/appointmentModel')
const doctorModel = require('../../models/doctorModel');
const { format, startOfMonth, endOfMonth, startOfDay, endOfDay } = require('date-fns');
const AppError = require('../../utils/AppError');
const ObjectId = require('mongoose').Types.ObjectId


const getAppointmentsForSpecificDay = async (doctorId, date) => {
    const response = await appointmentModel.aggregate([
        {
            $match: { doctorId: new ObjectId(doctorId), date: date }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'patientInformation'
            }
        },
        {

            $unwind: "$patientInformation"

        },
        {
            $project: {
                userName: "$patientInformation.fullName",
                phoneNumber: "$patientInformation.phoneNumber",
                date: true,
                time: true,
                status: true,
                paymentWay: true,
                reason: true,

            }
        },
    ]);
    return response;
}

const getTotlaAppointmentsForThisMonth = async (doctorId,date) => {
    const response = await appointmentModel.countDocuments({
        doctorId: doctorId,
        date: { $gte:format( startOfMonth(date),'yyyy-MM-dd'), $lte: format(endOfMonth(date),'yyyy-MM-dd') }
    })
    return response
}
const getWorkingDays = async (doctorId) => {
    const response = await doctorModel.findById(doctorId, { workingDays: true, _id: false });
    return response?.workingDays;
}



const handleGetBookings = async (req, res, next) => {

    try {
        const doctorId = res.locals.id;
        if (!doctorId) {
            throw new AppError(404, 'no specific doctor');
        }
        let date;
        if (req.query.date != 'null' && req.query.date) {
            date = req.query.date
        } else {
            throw new AppError(400, 'no specific date');
        }

        const [appointmentsForSpecificDay, appointmentsCountForThisMonth, workingDays] = await Promise.all([getAppointmentsForSpecificDay(doctorId, date), getTotlaAppointmentsForThisMonth(doctorId,date), getWorkingDays(doctorId)])
        return res.status(200).send({ appointments: appointmentsForSpecificDay, countOfAppointmentsThisMonth: appointmentsCountForThisMonth, workingDays });

    } catch (err) {
        next(err);
    }
}
module.exports = handleGetBookings;