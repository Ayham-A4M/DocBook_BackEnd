const pagination = (req,limit) => {
    const page = req.query.page || 1;
    const skip = (page === 1) ? 0 : (page - 1) * limit
    return { page, skip }
}
module.exports = pagination