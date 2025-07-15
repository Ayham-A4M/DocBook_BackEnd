const calcPagesNumber = (numberOfDocuments, limit) => {
    return Math.ceil((numberOfDocuments / limit))
}
module.exports=calcPagesNumber