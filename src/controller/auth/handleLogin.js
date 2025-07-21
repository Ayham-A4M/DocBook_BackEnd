const userModel = require('../../models/userModel')
const doctorModel = require('../../models/doctorModel')
const bcrybt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../../utils/AppError');
require('dotenv').config()
const handleLogin = async (req, res, next) => {
    try {
        const user = req.body;
        let userFromDB = undefined;
        // check if who logged in doctor or user (admin,normal user)
        if (user.role === 'user') {
            userFromDB = await userModel.findOne({ email: user.email })
        } else {
            userFromDB = await doctorModel.findOne({ email: user.email }) // the user here is doctor 
        }
        // check if the user is exist

        if (!userFromDB) { throw new AppError(403, 'wrong password or email') }
        // start compare bertween passwords !!
        await bcrybt.compare(user.password, userFromDB.password).then((response) => {
            if (!response) {
                throw new AppError(403, 'wrong password or email')
            }
            // create jwt token (role && tokenVersion && fullName) http only cookies
            const payload = { id: userFromDB._id, role: userFromDB.role, email: userFromDB.email, fullName: userFromDB.fullName }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' }); // after 30 miniuts it will expired and return 401
            const refreshToken = jwt.sign({ ...payload, tokenVersion: userFromDB.tokenVersion }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' });
            // after create jwt and refresh token send it to user with done operation
            // res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 30 * 60 * 1000 }); //original
            res.cookie('jwt', accessToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 1 * 60 * 1000 });
            res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 }); 
            // res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 3 * 24 * 60 * 60 * 1000 }); // original
            return res.status(201).send({ msg: 'logged in successfully', user: { role: userFromDB.role } })
        })
    } catch (err) {
        next(err);
    }
}
module.exports = handleLogin;