const userModel = require('../../models/userModel')
const doctorModel = require('../../models/doctorModel')
const jwt = require('jsonwebtoken')
const AppError = require('../../utils/AppError')
require('dotenv')
const handleLogout = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) { throw new AppError(403, 'request forbeddin') }
        let userFromDB = undefined;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) { throw new AppError(401, 'token revoked') }
            if (decode.role === 'user' || decode.role === 'admin') {
                userFromDB = await userModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } })
            } else if (decode.role === 'doctor') {
                userFromDB = await doctorModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } })
            }
            if (userFromDB) {
                res.clearCookie('jwt', {
                    httpOnly: true,
                    secure: true
                })
                res.clearCookie('refreshToken', {
                    httpOnly: true,
                    secure: true
                })
                return res.status(200).send({ msg: 'logout done' })
            }

        })
    } catch (err) {
        next(err);
    }

}

module.exports = handleLogout