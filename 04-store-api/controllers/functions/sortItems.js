function sortItems(result, sort) {
    // requires syntax with spaces between each item
    if (sort) {
        result = result.sort(sort.replaceAll(",", " "));
    }
    else result = result.sort("createdAt");
    return result;
}

module.exports = sortItems;