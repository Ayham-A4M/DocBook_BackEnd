const registerSchema = require('./schemas/register.schema');

const validateRegister = (req, res, next) => {
    try {
        const { error } = registerSchema.validate(req.body);
        if (error) { throw error}
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = validateRegister