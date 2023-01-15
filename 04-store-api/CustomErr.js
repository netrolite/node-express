module.exports = class CustomErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}