const Joi = require("joi");
const customMessages = {
    'string.empty': '{#label} cannot be empty',
    'any.required': '{#label} is required',
    'string.email': 'Please enter a valid email',
    'string.pattern.base': 'Password must contain letters and numbers (8-30 chars)',

};
const { safeStringSchema } = require('../../../helper/safeSchemas')

const updateProfileSchema = Joi.object({

    fullName: safeStringSchema.min(3).max(30).messages(customMessages),
    email: Joi.string()
        .email()
        .required()
        .messages(customMessages),

    age: Joi.number()
        .integer()
        .min(25)
        .max(90)
        .required()
        .messages(customMessages),
    universityGraduate:safeStringSchema.min(5).max(50),
    address: Joi.string()
        .pattern(/^[A-Za-z]+-[A-Za-z]+-[A-Za-z0-9]+$/) //like Usa-SanFransisco-Park930930
        .required()
        .min(10)
        .max(40)
        .messages({
            'string.pattern.base': 'Address must follow format: Country-City-District (e.g., USA-SanFrancisco-Park)',
        }),

    phoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .required()
        .messages({
            'string.pattern.base': 'phone number must contains only numbers'
        }),



})
module.exports = updateProfileSchema