const ApiError = require("../ApiError");

async function errHandler(err, req, res, next) {
    console.log(err.message);

    // ApiError provides custom status code other than 500
    if (err instanceof ApiError) res.status(err.statusCode);
    else res.status(500);
    
    res.json({ message: err.message })
}

module.exports = errHandler;
