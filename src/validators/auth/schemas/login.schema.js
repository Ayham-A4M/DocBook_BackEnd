const Joi = require('joi');

const customMessages = {
    'string.empty': '{#label} cannot be empty',
    'any.required': '{#label} is required',
    'string.email': 'Please enter a valid email',
    'string.pattern.base': 'Password must contain letters and numbers (8-30 chars)',

};

const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages(customMessages),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages(customMessages),
    role: Joi.string()
        .valid('admin', 'user', 'doctor')
        .required()
        
})
module.exports = loginSchema