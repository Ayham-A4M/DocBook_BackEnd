const Joi = require('joi');
const safeStringSchema = Joi.string()
    .trim() // Remove whitespace
    .regex(/^[a-zA-Z0-9\s\$\!\(\)\?\@\#\%\&\*\+\-\=\[\]\{\}\:\;\,\.\/\\]*$/) // Allowed chars
    .max(500) // Prevent long malicious strings
    .messages({
        'string.pattern.base': 'Only letters, numbers, and certain special characters ($, !, ?, etc.) are allowed.',
        'string.max': 'Input must be less than {#limit} characters.'
    }).required();
const dateSchema = Joi.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/).required()
const timeSchema = Joi.string().pattern(
    /^(0?[1-9]|1[0-2]):([0-5][0-9])\s?(AM|PM)$/i,
    'hh:mm AM/PM'
).required();
module.exports = { safeStringSchema, dateSchema, timeSchema };