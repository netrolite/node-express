const ApiError = require("../../../errors/ApiError");

function validateUserCredentials(credentials) {
    for (let credential of Object.values(credentials)) {
        if (typeof credential !== "string") {
            throw new ApiError("Credentials must be type of string", 400);
        }

        credential = credential.trim();
        
        if (!credential) {
            throw new ApiError("Invalid credentials.", 400);
        }
    }
}

module.exports = validateUserCredentials;