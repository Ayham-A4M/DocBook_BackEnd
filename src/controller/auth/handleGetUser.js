const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel')
const doctorModel = require('../../models/doctorModel');
const AppError = require('../../utils/AppError');
require('dotenv')
const handleGetUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) { throw new AppError(401,'unauthorized') } //un auth
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err)
                throw err
            let user = undefined;
            if (decode.role == 'user') {
                user = await userModel.findById(decode.id)
            } else if (decode.role == 'doctor') {
                user = await doctorModel.findById(decode.id)
            } else if (decode.role == 'admin' && decode.email == process.env.ADMIN_EMAIL) {
                user = await userModel.findById(decode.id)
            }
            if (user) {
                return res.status(200).send({ user: { role: user.role } })
            }
            throw new AppError(500,'server error');
            
        })
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetUser