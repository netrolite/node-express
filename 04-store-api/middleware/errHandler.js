const CustomErr = require("../CustomErr");

async function errHandler(err, req, res, next) {
    if (err instanceof CustomErr) {
        res.status(err.statusCode);
        return res.json({ message: err.message });
    }
    
	// if err is not an instance of CustomErr, send a generic response
    console.log("This is my real error");
    console.log(err.message);
    return res.status(500).json({ message: err.message })
}

module.exports = errHandler;
