const holidaySchema = require('../admin/schemas/holiday.schema');

const validateHoliday = (req, res, next) => {
    try {
        const { error } = holidaySchema.validate(req.body);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }

}

module.exports = validateHoliday