const { default: mongoose } = require("mongoose");
// !! only admin can create doctor !!
const schema = new mongoose.Schema({
    fullName: String,
    age: Number,
    gender: String,
    image: String,
    specialization: String,
    workingDays: Array,
    universityGraduate: String, //name of university
    experience: Number, // and adding to it y
    phoneNumber: String,
    fee: Number,
    email: String,
    address: String,
    password: String,
    role: { type: String, default: 'doctor' },
    treatmentsNumber: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    tokenVersion: { type: Number, default: 0 } // this for login and logout
});
const doctorModel = mongoose.model('doctor', schema, 'doctors')
module.exports = doctorModel