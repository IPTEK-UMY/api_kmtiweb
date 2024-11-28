const responseAPI = (Reqstatus, data, message, res) => {
    res.status(Reqstatus).json({
        response : Reqstatus,
        data : data,
        message : message
    })
}

module.exports = responseAPI