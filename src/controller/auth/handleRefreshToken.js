const jwt = require('jsonwebtoken');
const userModel = require('../../models/userModel')
const doctorModel = require('../../models/doctorModel');
const AppError = require('../../utils/AppError');
require('dotenv');
const handleRefreshToken = async (req, res, next) => {
    console.log('api refresh token hit');
    try {
        const refreshToken = req.cookies.refreshToken;
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
            if (err) { throw new AppError(403,'session is end you should login ') }
            if (decode) {
                const role = decode.role;
                console.log(role,'  : role')
                let user = undefined
                if (role == 'user' || role == 'admin') {
                    user = await userModel.findById(decode.id);
                } else if (role == 'doctor') {
                    user = await doctorModel.findById(decode.id);
                }
                // compare token version
                if (user.tokenVersion == decode.tokenVersion) {
                    // create another jwt
                    const payload = { id: decode.id, role: role, email: user.email, fullName: user.fullName }
                    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
                    res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 60 * 1000 }); //will removed after 30 miniutes
                    return res.status(200).send({});
                }
                let response = undefined;
                if (role == 'user') {
                    response = await userModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } });
                } else if (role == 'doctor') {
                    response = await doctorModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } });
                }
                // throw new AppError(400, ' seesion is end you should login');
                return res.status(400).send({ msg: 'session is end you should login' });
            }
        })
    } catch (err) {
        next(err);
    }
}
module.exports = handleRefreshToken