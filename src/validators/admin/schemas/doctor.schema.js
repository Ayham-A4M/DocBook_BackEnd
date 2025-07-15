const Joi = require("joi");
const {safeStringSchema}=require('../../../helper/safeSchemas')
const customMessages = {
    'string.empty': '{#label} cannot be empty',
    'any.required': '{#label} is required',
    'string.email': 'Please enter a valid email',
    'string.pattern.base': 'Password must contain letters and numbers (8-30 chars)',

};

const doctorSchema = Joi.object({
    fullName:safeStringSchema.min(3).max(30).messages(customMessages),
    
   
    email: Joi.string()
        .email()
        .required()
        .messages(customMessages),
    password: Joi.string()
        .min(8)
        .max(20)
        .required()
        .messages(customMessages),
    age: Joi.number()
        .integer()
        .min(25)
        .max(90)
        .required()
        .messages(customMessages),
    specialization: Joi.string()
        .min(3)
        .max(35)
        .required(),
    address: Joi.string()
        .pattern(/^[A-Za-z]+-[A-Za-z]+-[A-Za-z0-9]+$/) //like Usa-SanFransisco-Park930930
        .required()
        .min(10)
        .max(40)
        .messages({
            'string.pattern.base': 'Address must follow format: Country-City-District (e.g., USA-SanFrancisco-Park)',
        }),
    gender: Joi.string()
        .valid('Male', 'Female')
        .required()
        .messages({
            'any.only': 'Only "male" and "female" are allowed', // For `.valid()`
            'any.required': 'Gender is required' // For `.required()`
        }),
    workingDays: Joi.array()
        .items(Joi.string().valid('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'))
        .required()
        .unique() // ensures no duplicate days
        .min(1)   // at least one day required
        .max(7)   // can't have more than 7 days
        .messages({
            'array.base': 'Working days must be an array',
            'array.unique': 'Duplicate days are not allowed',
            'array.min': 'At least one working day is required',
            'array.max': 'Maximum 7 working days allowed',
            'any.required': 'Working days are required',
            'string.valid': 'Each day must be a valid day abbreviation (sun, mon, etc.)'
        }),
    universityGraduate:safeStringSchema.min(3).max(25),
    experience: Joi.number()
        .integer()
        .min(1)
        .max(65)
        .required(),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]+$/)
        .required()
        .min(5)
        .max(20)
        .messages({
            'string.pattern.base': 'phone number must contains only numbers'
        }),
    fee: Joi.number()
        .integer()
        .required(),

})
module.exports = doctorSchema



