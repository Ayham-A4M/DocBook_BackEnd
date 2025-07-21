const Joi = require('joi');
const { safeStringSchema, dateSchema } = require('../../../helper/safeSchemas');

const rateSchema = Joi.object({
    doctorId: Joi.string().required(),
    date: dateSchema,
    rate: Joi.number().min(1).max(5).required(),
    feeling: Joi.string().valid('happy', 'angry', 'sad', 'surprised', 'great'),
    opinion: Joi.string().trim().min(5).max(100).required(),
})
module.exports = rateSchema