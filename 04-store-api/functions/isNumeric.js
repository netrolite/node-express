function isNumeric(n) {
    return !isNaN(parseFloat(n) && Number.isFinite(n));
}

module.exports = isNumeric;