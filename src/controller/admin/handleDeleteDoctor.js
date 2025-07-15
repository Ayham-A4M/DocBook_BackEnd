const doctorModel = require('../../models/doctorModel');
const AppError = require('../../utils/AppError');
const handleDeleteDoctor = async (req, res, next) => {
    try {
        const { doctorId } = req.body
        if (!doctorId) {
            throw new AppError(404, 'no specific doctor')
        }
        const deleteResponse = await doctorModel.findByIdAndDelete(doctorId);
        if (deleteResponse) {
            return res.status(200).send({ msg: 'doctor has been deleted' });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleDeleteDoctor;