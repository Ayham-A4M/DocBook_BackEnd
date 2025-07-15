const { default: mongoose } = require('mongoose')
const holidaySchema = new mongoose.Schema({
    date: { type: String, required: true },
    reason: { type: String, required: true },
});
holidaySchema.index(
    {date:1},
    {unique: true,message: "This date is already holiday"}
)
const holidayModel = mongoose.model('holiday', holidaySchema, 'holidays');
module.exports = holidayModel;
