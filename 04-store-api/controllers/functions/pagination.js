function pagination(result, page, limit) {
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    return result.skip(skip).limit(limit);
}

module.exports = pagination;