const { default: mongoose } = require("mongoose");
const { Types: { ObjectId } } = mongoose;
// for normal user
const appointmentSchema = new mongoose.Schema({
  date_time: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: Date, required: true },
  doctorId: { type: ObjectId, ref: 'doctor', required: true },
  userId: { type: ObjectId, ref: 'user', required: true },
  fee: { type: Number, required: true },
  reason: { type: String, require: true },
  status: { type: String, default: 'pending' },
  paymentWay: { type: String, require: true }
});
appointmentSchema.index(
  { doctorId: 1, date_time: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["confirmed", "pending"] } },
    message: "This time slot is already booked with the doctor"
  }
);

appointmentSchema.index(
  { userId: 1, date_time: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["confirmed", "pending"] } },
    message: "You already have appointment at this time"
  }
)
const appointmentModel = mongoose.model('appointment', appointmentSchema, 'appointments')
module.exports = appointmentModel;