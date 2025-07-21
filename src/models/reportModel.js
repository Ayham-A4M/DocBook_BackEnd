const { required } = require("joi");
const { default: mongoose } = require("mongoose");
const { Types: { ObjectId } } = mongoose;
const reportSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    date: { type: Date, required: true },
    age: { type: Number, required: true },
    reason: { type: String, required: true }, //why patent visit the doctor??
    symptoms: { type: String, required: true },
    prescriptions: { type:Array, required: true },
    notesForPatient:{type:Array,required:true},
    doctorSummary: { type: String, required: true },
    appointmentId: { type: ObjectId, required: true },
    status: { type: String, default: 'completed' }, //like archived or completed
    patientStatus:{type:String,required: true},
    doctorId: { type: ObjectId, required: true }
});

const reportModel = mongoose.model('report', reportSchema, 'reports')
module.exports = reportModel;
