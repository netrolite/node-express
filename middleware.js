function middleware(req, res, next) {
    const method = req.method;
    const date = new Date().getFullYear();
    console.log(method, date);
    next();
}

module.exports = middleware;