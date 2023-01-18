function pagination(products, page, limit) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    return products.skip(skip).limit(limit);
}

module.exports = pagination;