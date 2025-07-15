const doctorModel = require('../../models/doctorModel');
const escapeRegex = require('../../helper/escapeRegex');
const pagination = require('../../helper/pagination');
const clacPagesNumber=require('../../helper/clacPagesNumber');
const handleGetDoctors = async (req, res, next) => {
    // first we need to check if there are specific type of doctors 
    const doctorLimit = 12;
    const matchObject = {};
    const { page, skip } = pagination(req, doctorLimit)
    if (req.query.specialization != 'default' && req.query.specialization) {
        matchObject.specialization = req.query.specialization;
    }
    if (req.query.fullName) {
        matchObject.fullName = { $regex: escapeRegex(req.query.fullName), $options: "i" }
    }
    try {
        const [doctors,doctorCount] = await Promise.all([doctorModel.find(matchObject, { "__v": false, "tokenVersion": false, gender: false, age: false, universityGraduate: false, phoneNumber: false, address: false, email: false, password: false }).skip(skip).limit(doctorLimit),doctorModel.countDocuments(matchObject)])
        return res.status(200).send({doctors:doctors,limit:clacPagesNumber(doctorCount,doctorLimit)})
    } catch (err) {
        next(err);
    }

}
module.exports = handleGetDoctors;