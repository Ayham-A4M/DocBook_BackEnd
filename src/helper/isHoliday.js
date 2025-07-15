const holidayModel=require('../models/holidayModel')
const isHoliday=async(date)=>{
    const isholiday=await holidayModel.findOne({date:date});
    if(isholiday){return true}
    return false 
}
module.exports=isHoliday