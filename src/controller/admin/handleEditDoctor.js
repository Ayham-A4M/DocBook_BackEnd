const doctorModel = require('../../models/doctorModel');
const AppError = require('../../utils/AppError');
const handleEditDoctor = async (req, res, next) => {
    try {
        const doctorId = req.query.doctorId;
        if (!doctorId) { throw new AppError(404, 'no specefic doctor') }
        const newDoctorInformation =req.body.docInformation;
        // if (req.file) {
        //     newDoctorInformation.image = `/public/images/${req.file.filename}` //form Multer its optinal
        // }
        console.log(doctorId);
        console.log(newDoctorInformation);
        const updateDoctor = await doctorModel.findByIdAndUpdate(doctorId, newDoctorInformation);
        console.log(updateDoctor);
        if (updateDoctor) {
            return res.status(200).send({ msg: 'doctor profile has been updated ' });
        }
    } catch (err) {
        next(err)
    }
}
module.exports = handleEditDoctor