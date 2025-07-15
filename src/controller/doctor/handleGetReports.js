const reportModel = require('../../models/reportModel');
const escapeRegex = require('../../helper/escapeRegex');
const handleGetReports = async (req, res,next) => {
    const limit = 20;
    const page = req.query.page || 1;
    const skip = (page === 1) ? 0 : (page - 1) * limit

    const name = req.query.patientName;
    const status = req.query.status;
    const doctorId = res.locals.id;
    let objectMatch = { doctorId: doctorId }
    if (name) { objectMatch.patientName = { $regex: escapeRegex(name), $options: "i" } }
    if (status) { objectMatch.status = status }

    try {
        const getResponse = await reportModel.find(objectMatch, { appointmentId: true, patientName: true, reason: true, date: true, status: true }).skip(skip).limit(limit).exec();
        const numberOfReportInDB=await reportModel.countDocuments(objectMatch);
        if (getResponse) { return res.status(200).send({ reports: getResponse, limit: Math.ceil((numberOfReportInDB/limit)), }) }
    } catch (err) {
        next(err)
    }

}
module.exports = handleGetReports