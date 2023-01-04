function middleware(req, res, next) {
    console.log("This is some middleware");
    next();
}

module.exports = middleware;