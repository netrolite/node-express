function isBoolean(string) {
    console.log(string, "string");
    if (string === "true") return true;
    return false;
}

module.exports = isBoolean;