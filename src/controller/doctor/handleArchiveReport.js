const reportModel = require('../../models/reportModel');
const AppError = require('../../utils/AppError');

const handleArchiveReport = async (req, res, next) => {
    const doctorId = res.locals.id;
    const { reportId, status } = req.body;
    try {
        if (status != "completed" && status != "archived") { throw new AppError(400, 'unexpected value') }
        const updateResponse = await reportModel.findOneAndUpdate({ _id: reportId, doctorId: doctorId }, { status: status }); // more secure than just reportId
        if (updateResponse) {
            return res.status(200).send({ msg: `report ${status == "archived" ? status : 'unarchived'}` })
        }
    } catch (err) {
        next(err)
    }
}
module.exports = handleArchiveReport