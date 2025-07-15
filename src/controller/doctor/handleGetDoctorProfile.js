const doctorModel = require('../../models/doctorModel');
const handleGetDoctorProfile = async (req, res, next) => {
    const doctorId = res.locals.id;
    try {
        const profileResponse = await doctorModel.findById(doctorId,{tokenVersion:false,password:false,__v:false,gender:false,role:false,_id:false});
        if (profileResponse) {
            return res.status(200).send(profileResponse);
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetDoctorProfile