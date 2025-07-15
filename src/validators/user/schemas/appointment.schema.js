const Joi = require('joi');
const { safeStringSchema, dateSchema, timeSchema } = require('../../../helper/safeSchemas');
const appointmentSchema = Joi.object({
    doctorId: Joi.string().required(),
    date_time: Joi.string().required(),
    date: dateSchema,
    time: timeSchema,
    fee: Joi.number().min(1).max(3000).required(),
    reason: safeStringSchema,
    paymentWay: Joi.string().valid('cash', 'stripe').required(),

})
module.exports = appointmentSchema