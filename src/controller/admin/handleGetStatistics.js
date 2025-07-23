const reportModel = require('../../models/reportModel');
const doctorModel = require('../../models/doctorModel');
const userModel = require('../../models/userModel');
const appointmentModel = require('../../models/appointmentModel');
const { format, startOfMonth, startOfWeek, endOfWeek, endOfMonth, subMonths, parseISO, startOfDay, endOfDay } = require('date-fns')

const getWeeklyIncome = async () => {
    const now = new Date();
    const startWeek = format(startOfWeek(now), 'yyyy-MM-dd');
    const endWeek = format(endOfWeek(now), 'yyyy-MM-dd');

    const statistics = await appointmentModel.aggregate([
        {
            $match: {
                date: { $gte: startWeek, $lte: endWeek },
                $or: [
                    { paymentWay: 'stripe' },
                    { paymentWay: 'cash', status: 'confirmed' }
                ]
            },


        },
        {
            $group: {
                _id: "$date",
                cash: { $sum: "$fee" }
            }
        },
        {
            $project: {
                _id: 0,
                date: "$_id",
                cash: 1
            }
        }

    ])

    statistics.map((e) => {
        e.date = format(e.date, "EEEE");
    })
    return statistics
}

const getThisMonthIncome = async () => {
    const response = await appointmentModel.aggregate([
        {
            $match: {
                date: { $gte: format(startOfMonth(new Date()), 'yyyy-MM-dd'), $lte: format(endOfMonth(new Date()), 'yyyy-MM-dd') },
                $or: [
                    { paymentWay: 'stripe' },
                    { paymentWay: 'cash', status: 'confirmed' }
                ]
            }, 

        },

        {
            $group: {
                _id: null,
                income: { $sum: "$fee" }
            }
        } // this will return the income of this month
        ,
        {
            $project: {
                _id: 0,
                income: 1

            }
        }
    ]);
    return response[0].income;
}

const getMonthlyAppointmentsStatus = async () => {
    const now = new Date();
    const startMonthDate = format(startOfMonth(now), 'yyyy-MM-dd')
    const endMonthDate = format(endOfMonth(now), 'yyyy-MM-dd');

    const response = await appointmentModel.aggregate([
        {
            $match: {
                date: { $gte: startMonthDate, $lte: endMonthDate },
            }
        },
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            }
        },
        {
            $project: {
                status: "$_id",
                count: 1,
                _id: 0
            }
        }
    ])
    return response;
}

const handleGetStatistics = async (req, res, next) => {
    try {
        const now = new Date();
        const [doctorsNumber, usersNumber, weeklyIncome, thisMonthIncome, monthlyAppointmentsStatus, reportsNumber, todayAppointmentsNumber, topDoctors] = await Promise.all(
            [
                doctorModel.countDocuments(),
                userModel.countDocuments({ role: 'user' }),
                getWeeklyIncome(),
                getThisMonthIncome(),
                getMonthlyAppointmentsStatus(),
                reportModel.countDocuments(),
                appointmentModel.countDocuments({ date: format(now,'yyyy-MM-dd') }),
                doctorModel.find({}, { fullName: 1, specialization: 1, rate: 1, treatmentsNumber: 1 }).sort({ rate: -1, treatmentsNumber: -1 }).limit(5)

            ])
        const [currentMontheIncome, previousMontheIncome] = await Promise.all(
            [
                appointmentModel.aggregate([
                    { $match: { status: 'confirmed', date: { $gte: format(startOfMonth(now),'yyyy-MM-dd'), $lte: format(now,'yyyy-MM-dd') } } },
                    { $group: { _id: null, total: { $sum: "$fee" } } }
                ]),
                appointmentModel.aggregate([
                    { $match: { date: { $gte: format(subMonths(startOfMonth(now), 1),'yyyy-MM-dd'), $lte: format(subMonths(now, 1) ,'yyyy-MM-dd')}, status: 'confirmed' } },
                    { $group: { _id: null, total: { $sum: "$fee" } } }
                ]),
            ]
        )
        const monthlyGrowthPercentage = (100 - ((previousMontheIncome[0]?.total || 0) / (currentMontheIncome[0]?.total || 0)) * 100).toFixed(2);

        const specializationNumbers = await doctorModel.aggregate([
            {
                $group: {
                    _id: '$specialization', // Group by specialization field
                    count: { $sum: 1 }, // Count documents in each group
                },
            },
            // Step 3: Format output to have 'name' instead of '_id'
            {
                $project: {
                    name: '$_id', // Rename _id to name
                    count: 1, // Keep the count
                    _id: 0, // Exclude _id from output
                },
            },
        ])

        return res.status(200).send({ doctorsNumber, usersNumber, weeklyIncome, thisMonthIncome, monthlyAppointmentsStatus, reportsNumber, specializationNumbers, topDoctors, todayAppointmentsNumber, monthlyGrowthPercentage })

    } catch (err) {
        next(err);
    }
}
module.exports = handleGetStatistics
