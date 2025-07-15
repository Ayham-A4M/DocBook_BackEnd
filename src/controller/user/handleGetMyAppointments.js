const appointmentModel = require('../../models/appointmentModel')
const ObjectId = require('mongoose').Types.ObjectId;
const handleGetMyAppointments = async (req, res, next) => {
    const userId = res.locals.id;
    const type = req.query.type;
    const page = req.query.page;
    const limit = 5;
    const skip = (page == 1) ? 0 : (page - 1) * limit
    let matchObject = { userId: new ObjectId(userId) };
    if (type == "confirmed" || type == "pending" || type == "canceled") {
        matchObject.status = type;
    }
    try {
        const appointmentResponse = await appointmentModel.aggregate([
            {
                $match: matchObject
            },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctorInformation'
                }
            },
            {
                $unwind: '$doctorInformation'
            }, {
                $project: {
                    doctorName: "$doctorInformation.fullName",
                    doctorImage: "$doctorInformation.image",
                    doctorSpecialization: "$doctorInformation.specialization",
                    fee: true,
                    date: true,
                    time: true,
                    status: true,

                }
            },
            {
                $sort: { date: -1 }
            }
        ]).skip(skip).limit(limit)

        if (appointmentResponse) {
            const numberOfAppointmentInDB = await appointmentModel.countDocuments(matchObject);

            return res.status(200).send({ appointments: appointmentResponse, limit: Math.ceil((numberOfAppointmentInDB / limit)) });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetMyAppointments