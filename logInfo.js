const os = require("os");

function logInfo(req, res, next) {
    const method = req.method;
    const date = new Date().getFullYear();
    const platform = os.platform();
    const machine = os.machine();
    console.log(method, date, platform, machine);
    next();
}

module.exports = logInfo;