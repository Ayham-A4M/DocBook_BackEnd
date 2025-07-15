const jwt = require('jsonwebtoken');
require('dotenv');
const verifyAdmin = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) { return res.status(401).send({ msg: 'unauthorized' }) }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err) { res.status(401).send({ msg: 'token revoked' }) }
        if (decode.role === "admin" && decode.email == process.env.ADMIN_EMAIL) { return next(); }
        else { return res.status(403).send({ msg: 'request blocked' }) }
    })
}
module.exports = verifyAdmin



