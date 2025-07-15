const reportSchema=require('./schemas/report.schema');
const validateReport=(req,res,next)=>{
    try {
        // report: { ...report, date: date }, appointmentId
        const {report,appointmentId}=req.body;
        const { error } = reportSchema.validate({...report,appointmentId});
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}
module.exports=validateReport;