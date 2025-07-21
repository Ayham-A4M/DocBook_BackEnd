const doctorModel = require('../../models/doctorModel');
const { uploadToVercelBlob } = require('../../utils/vercelBlobImageUpload')
const handleUpdateProfile = async (req, res, next) => {
    try {

        const doctorId = res.locals.id;
        let updatedData = {};
        if (req.body.editInformation) {
            updatedData = JSON.parse(req.body.editInformation);
        }
        if (req.file) {
            console.log('there is file');
            updatedData.image = await uploadToVercelBlob(req.file);
            // updatedData.image = `/public/images/${req.file.filename}`;
        }
        const updatedResponse = await doctorModel.findByIdAndUpdate(doctorId, updatedData);
        if (updatedResponse) {
            return res.status(200).send({ msg: 'profile has been updated' });
        }

    } catch (err) {
        next(err);
    }
}
module.exports = handleUpdateProfile