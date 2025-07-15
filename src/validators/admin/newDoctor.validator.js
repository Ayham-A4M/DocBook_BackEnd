const AppError = require('../../utils/AppError');
const doctorSchema = require('../admin/schemas/doctor.schema');

const validateNewDoctor = (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError(500,'no image with request')
        }
        const doctorInformation = JSON.parse(req.body.docInformation);
        const { error } = doctorSchema.validate(doctorInformation);
        if (error) { throw error}
        next()
    } catch (err) {
        next(err)
    }

}

module.exports = validateNewDoctor