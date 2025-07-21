const userModel = require('../../models/userModel')
const doctorModel = require('../../models/doctorModel')
const jwt = require('jsonwebtoken')
const AppError = require('../../utils/AppError')
require('dotenv')

const handleLogout = (req, res, next) => {
    const clearTokens = () => {
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true
        })
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: true
        })
    }
    try {
        const token = req.cookies.jwt;
        const refreshToken = req.cookies.refreshToken;
        let userFromDB = undefined;
        if (token) { // if user has jwt token normal logout 
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
                if (err) { clearTokens(); return res.status(200).send({ msg: 'You are now logged out' }); }
                if (decode.role === 'user' || decode.role === 'admin') {
                    userFromDB = await userModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } })
                } else if (decode.role === 'doctor') {
                    userFromDB = await doctorModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } })
                }

                clearTokens();
                return res.status(200).send({ msg: 'You are now logged out' });


            })
        }
        if (!token && refreshToken) { // if user doesn`t have jwt token then we go to refresh token to extract his id 
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decode) => {
                if (err) { clearTokens(); return res.status(200).send({ msg: 'You are now logged out' }); }
                if (decode.role === 'user' || decode.role === 'admin') {
                    userFromDB = await userModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } })
                } else if (decode.role === 'doctor') {
                    userFromDB = await doctorModel.findByIdAndUpdate(decode.id, { $inc: { tokenVersion: 1 } })
                }
                clearTokens();
                return res.status(200).send({ msg: 'You are now logged out' });
            })
        }
        // final case if he doesn`t has token or refreshToken then just clear the cookies (rare to happend)
        if (!token && !refreshToken) {
            clearTokens()
            return res.status(200).send({ msg: 'You are now logged out' })
        }

    } catch (err) {
        next(err);
    }

}

module.exports = handleLogout