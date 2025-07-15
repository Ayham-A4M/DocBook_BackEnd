const doctorModel = require('../../models/doctorModel')
const commentModel = require('../../models/commentModel');
const AppError = require('../../utils/AppError');
// 
const handleRateDoctor = async (req, res, next) => {
    const userId = res.locals.id;
    const { rate, opinion, feeling, doctorId, date } = req.body;
    try {
        if (!rate || !opinion || !feeling || !doctorId || !date) { throw new AppError(400,'missing value to create comment') }
        const newComment = {
            date,
            doctorId,
            userId,
            content: opinion,
            rate,
            feeling
        }
        // save the comment in data base and update the doctor rate
        const saveComment = new commentModel(newComment);
        const responseSaveComment = await saveComment.save();
        if (responseSaveComment) {
            const responseRating = await doctorModel.findByIdAndUpdate(doctorId,

                [
                    {
                        $set: {
                            rate: {
                                $round: [
                                    {
                                        $divide: [
                                            {
                                                $add: [
                                                    { $multiply: ["$rate", "$ratingCount"] }, // This is equivalent to your x calculation //240+userrate=245
                                                    rate
                                                ]
                                            },
                                            { $add: ["$ratingCount", 1] }
                                        ]
                                    }, 1
                                ]
                            },

                            ratingCount: { $add: ["$ratingCount", 1] }
                        }
                    }
                ]

            )
            if (responseRating) {
                return res.status(200).send({ msg: 'thanks for opinion :)' });
            }
        }
    }
    catch (err) {
       next(err)
    }
}
module.exports = handleRateDoctor

