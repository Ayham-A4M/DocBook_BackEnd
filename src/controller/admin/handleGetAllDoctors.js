const doctorModel = require('../../models/doctorModel');
const pagination = require('../../helper/pagination');
const calcPagesNumber = require('../../helper/clacPagesNumber');
const escapeRegex = require('../../helper/escapeRegex')
const handleGetAllDoctors = async (req, res, next) => {
    try {
        const matchObject = {};
        if (req.query.fullName) {
            matchObject.fullName = { $regex: escapeRegex(req.query.fullName), $options: "i" }
        }
        if (req.query.specialization && req.query.specialization != 'default') {
            matchObject.specialization = req.query.specialization
        }
        const limit = 20;
        const { page, skip } = pagination(req, limit); // whats the page and how many documents will skip
        const doctors = await doctorModel.find(matchObject, { image: true, specialization: true, rate: true, experience: true, fullName: true, age: true }).skip(skip).limit(limit);
        if (doctors) {
            const numberOfDoctors = await doctorModel.countDocuments(matchObject);
            return res.status(200).send({ doctors, limit: calcPagesNumber(numberOfDoctors, limit) });
        }


    } catch (err) {
        next(err);
       
    }
}
module.exports = handleGetAllDoctors