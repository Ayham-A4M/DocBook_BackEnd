const doctorModel = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
require('dotenv')
const verifyDoctor = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) { return res.status(401).send({ msg: 'unauthorized' }) }
    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decode) => {
            if (err) { return res.status(401).send({ msg: 'unauthorized' }) }
            const response = await doctorModel.findById(decode.id);
            if (response) {
                res.locals.id = decode.id;
                return next();
            }
            else {
                return res.status(404).send({ msg: 'unkown doctor' });
            }
        })
    } catch (err) {
        return res.status(500).send({ msg: 'server error' });
    }
}
module.exports = verifyDoctor;