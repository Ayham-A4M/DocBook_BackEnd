const updateProfile=require('./schemas/updateProfile.schema');
const validateUpdateProfile=(req,res,next)=>{
    try {
        if(!req.body.editInformation){return next();}
        const { error } = updateProfile.validate(JSON.parse(req.body.editInformation));
        if (error) { throw error }
        next()
    } catch (err) {
        next(err)
    }
}
module.exports=validateUpdateProfile;