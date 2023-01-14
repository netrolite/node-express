function errorHandler(err, req, res, next) {
    console.log("ERROR!!!");
    // console.error(err);
    res.status(500).json(err);
}

module.exports = errorHandler;