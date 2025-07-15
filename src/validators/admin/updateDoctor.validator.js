const updateDoctorSchema = require('../admin/schemas/updateDoctor.schema');

const validateUpdateDoctor = (req, res, next) => {
    try {
        const { error } = updateDoctorSchema.validate(req.body.docInformation);
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }

}

module.exports = validateUpdateDoctor