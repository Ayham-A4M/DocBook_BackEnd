const appointmentSchema = require('./schemas/appointment.schema');
const validateAppointment = (req, res, next) => {
    try {
        const { error } = appointmentSchema.validate(req.body);
        if (error) {
            console.log(error);
            throw error
        }
        next();
    } catch (err) {
        next(err);
    }
}
module.exports=validateAppointment