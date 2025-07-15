const Joi = require('joi');
const {safeStringSchema}=require('../../../helper/safeSchemas')
const customMessages = {
    'string.empty': '{#label} cannot be empty',
    'any.required': '{#label} is required',
    'string.email': 'Please enter a valid email',
    'string.pattern.base': 'Password must contain letters and numbers (8-30 chars)',

};

const registerSchema = Joi.object({
    fullName: safeStringSchema.min(3).max(30),
    email: Joi.string()
        .email()
        .required()
        .messages(customMessages),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages(customMessages),
    phoneNumber:safeStringSchema.min(5).max(20),
    age:Joi.number().integer().min(18).max(150).required()
})
module.exports = registerSchema