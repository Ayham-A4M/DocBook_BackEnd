const Joi = require("joi");
const {dateSchema,safeStringSchema}=require('../../../helper/safeSchemas')
const holidaySchema=Joi.object({
    date:dateSchema,
    reason:safeStringSchema,
});
module.exports=holidaySchema