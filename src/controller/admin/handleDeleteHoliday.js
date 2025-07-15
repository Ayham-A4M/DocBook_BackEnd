const holidayModel = require('../../models/holidayModel');
const AppError = require('../../utils/AppError');
const handleDeleteHoliday = async (req, res, next) => {
    try {
        const { holidayId } = req.body;
        if (!holidayId) {
            throw new AppError(404, 'no holiday')
        }
        const deleteResponse = await holidayModel.findOneAndDelete(holidayId);
        return res.status(200).send({ msg: 'holiday canceled !', deleteResponse });
    } catch (err) {
        next(err);
    }
}
module.exports = handleDeleteHoliday