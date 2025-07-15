const commentModel = require('../../models/commentModel');
const doctorModel = require('../../models/doctorModel');
const ObjectId = require('mongoose').Types.ObjectId;
const pagination = require('../../helper/pagination');
const calcPagesNumber = require('../../helper/clacPagesNumber')
const handleGetComments = async (req, res, next) => {
    try {
        const doctorId = res.locals.id;
        const limit = 20;
        const { page, skip } = pagination(req, limit); // whats the page and how many documents will skip


        const commentsResponse = await commentModel.aggregate([
            {
                $match: { doctorId: new ObjectId(doctorId) }
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
                    patientName: "$patientInformation.fullName",
                    feeling: true,
                    date: true,
                    content: true,
                    rate: true

                }
            },
            {
                $sort: { date: -1 }
            }
        ]).skip(skip).limit(limit)
        if (commentsResponse) {
            const rate = await doctorModel.findById(doctorId, { rate: true });
            const numberOfComments = await commentModel.countDocuments({ doctorId: doctorId });
            return res.status(200).send({ comments: commentsResponse, rate: rate.rate, limit: calcPagesNumber(numberOfComments, limit), totlaComments: numberOfComments });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetComments