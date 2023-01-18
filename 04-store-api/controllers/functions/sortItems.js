function sortItems(products, sort) {
    // requires syntax with spaces between each item
    if (sort) {
        products = products.sort(sort.replaceAll(",", " "));
    }
    else products = products.sort("createdAt");
    return products;
}

module.exports = sortItems;