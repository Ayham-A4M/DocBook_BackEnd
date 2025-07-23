const reportModel = require('../../models/reportModel');
const ObjectId =require('mongoose').Types.ObjectId
const handleGetReport = async (req, res) => {
    try {
        const id = req.query.id;
        const reportResponse = await reportModel.aggregate([
            {
                $match: { appointmentId: new ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'doctorId',
                    foreignField: '_id',
                    as: 'doctorInformation'
                }
            }, {
                $unwind: '$doctorInformation'
            }, {
                $project: {
                    doctorName: "$doctorInformation.fullName", 
                    doctorSpecialization: "$doctorInformation.specialization",
                    date: true,
                    patientName:true,
                    age:true,
                    reason:true,
                    symptoms:true,
                    prescriptions:true,
                    doctorSummary:true,
                    notesForPatient:true,
                    patientStatus:true,
                    _id:false
                }
            },
        ])
        return res.status(200).send(reportResponse[0]);
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetReport;