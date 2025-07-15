const holidayModel = require('../../models/holidayModel');
const AppError = require('../../utils/AppError');
const handleCreateHoliday = async (req, res,next) => {
    const { date, reason } = req.body;
    try {
        const newHoliday = { date, reason };
        const saveHoliday = new holidayModel(newHoliday);
        const createResponse = await saveHoliday.save();
        if (createResponse) {
            return res.status(200).send({ msg: 'holiday created', createResponse });
        }
    } catch (err) {

        if (err.code === 11000) {
            if (err.keyPattern.date) {
                next(new AppError(403, 'this date already put holiday'))
            }
        }
        next(err);
    }
}
module.exports = handleCreateHoliday