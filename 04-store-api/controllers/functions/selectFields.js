function selectFields(products, fields) {
    // select only specific fields
    // requires syntax with spaces between each item
    if (fields) {
        products = products.select(fields.replaceAll(",", " "));
    }
    return products;
}

module.exports = selectFields;