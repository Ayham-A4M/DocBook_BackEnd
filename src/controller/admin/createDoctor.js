const doctorModel = require('../../models/doctorModel');
const bcrybt = require('bcryptjs');
const AppError = require('../../utils/AppError');
const prepareDoctor = (data) => {
    const information = JSON.parse(data);
    const doctor = {
        fullName: information.fullName,
        age: information.age,
        address: information.address,
        gender: information.gender,
        specialization: information.specialization,
        workingDays: information.workingDays, // its like array [sun-mon-tue-.....];
        universityGraduate: information.universityGraduate,
        experience: information.experience,
        phoneNumber: information.phoneNumber,
        email: information.email,
        fee: information.fee,
        password: information.password,
        image: '', //for updated
    }
    return doctor;
}
const createDoctor = async (req, res, next) => {
    // doctor information it is form data 

    const doctor = prepareDoctor(req.body.docInformation);
    if (!req.file) {
        throw new AppError(400, 'image is need to save doctor');
    }

    doctor.image = `/public/images/${req.file.filename}` //multer will save this file with the name that create 
    // first check if the email created before 
    const sameEmail = await doctorModel.findOne({ email: doctor.email });
    if (sameEmail) {
        // return res.status(400).send({ msg: 'email exist before try another one' });
        throw new AppError(400,'email exist before try another one')
    }
    // second hashed the password
    const hashPassword = await bcrybt.hashSync(doctor.password, 10);
    doctor.password = hashPassword;

    const newDoctor = new doctorModel(doctor);
    try {
        const response = await newDoctor.save();

        if (response) {
            return res.status(200).send({ msg: 'new doctor saved successfully' })
        }
    } catch (err) {
        next(err);
    }
}
module.exports = createDoctor