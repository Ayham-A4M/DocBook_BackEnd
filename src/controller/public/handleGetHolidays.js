
const holidayModel = require('../../models/holidayModel');
const { startOfYear, endOfYear } = require('date-fns');
const handleGetHolidyas = async (req, res, next) => {

    const year = req.query.year || new Date().getFullYear(); // for example 2025

    try {
        const start = `${year}-01-01`;
        const end = `${year}-12-31`;
        const holidays = await holidayModel.find({ date: { $gte: start, $lte: end } }).sort({ date: -1 });
        return res.status(200).send(holidays);
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetHolidyas