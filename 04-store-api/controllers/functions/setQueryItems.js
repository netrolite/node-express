function setQueryItems(name, featured, company, price, rating) {
    let query = {};
    
    if (name) query.name = { $regex: name, $options: "i" }
    if (featured) query.featured = featured;
    if (company) query.company = company;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    return query;
}

module.exports = setQueryItems;