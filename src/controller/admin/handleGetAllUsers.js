const pagination = require('../../helper/pagination');
const userModel = require('../../models/userModel');
const calcPagesNumber=require('../../helper/clacPagesNumber');
const escapeRegex=require('../../helper/escapeRegex');
const handleGetAllUsers = async (req, res,next) => {
    try {
        const matchObject={role:{$ne:"admin"}};
        const searchByName=req.query.fullName;
        console.log(searchByName);
        if(searchByName){
            matchObject.fullName={$regex: escapeRegex(searchByName), $options: "i"}
        }
        const limit = 20;
        const { page, skip } = pagination(req, limit);
        const [userResponse, usersNumber] = await Promise.all(
            [
                userModel.find(matchObject,{fullName:true,age:true,email:true,phoneNumber:true}).skip(skip).limit(limit),
                userModel.countDocuments(matchObject)
            ]
        )
        return res.status(200).send({users:userResponse,limit:calcPagesNumber(usersNumber,limit)})
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetAllUsers;