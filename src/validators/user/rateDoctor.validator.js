const rateSchema = require('./schemas/rateDoctor.schema');
const validateRateDoctor = (req, res, next) => {
    try {
        const { error } = rateSchema.validate(req.body);
        if (error) {
            console.log(error);
            throw error
        }
        next();
    } catch (err) {
        next(err);
    }
}
module.exports=validateRateDoctor