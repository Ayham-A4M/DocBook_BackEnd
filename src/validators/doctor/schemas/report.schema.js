const Joi = require('joi');
const { safeStringSchema, dateSchema } = require('../../../helper/safeSchemas');
const reportSchema = Joi.object({
    patientName: safeStringSchema.min(3).max(30),
    age: Joi.number().min(1).max(150).required(),
    reason: safeStringSchema.min(10),
    symptoms: safeStringSchema,
    prescriptions: Joi.array()
        .required()
        .unique(),
    notesForPatient: Joi.array()
        .required()
        .unique(),
    patientStatus:Joi.string().valid('normal','stable','dangerous').required(),
    doctorSummary: safeStringSchema,
    date: dateSchema,
    appointmentId: Joi.string().required(),
})
module.exports = reportSchema;