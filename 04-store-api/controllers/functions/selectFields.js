function selectFields(result, fields) {
    // select only specific fields
    // requires syntax with spaces between each item
    if (fields) {
        result = result.select(fields.replaceAll(",", " "));
    }
    return result;
}

module.exports = selectFields;