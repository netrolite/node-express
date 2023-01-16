const Product = require("../models/Product");

async function getAllProductsTesting(req ,res) {
    const { name, featured, company, price, rating } = req.query;

    const products = await Product.find({
        name: {
            $regex: req.query.name,
            $options: "i"
        }
    })
    .sort("name");
    res.status(200).json({ resultsAmount: products.length, products });
}

async function getAllProducts(req, res) {
    const { name, featured, company, price, rating, sort, fields } = req.query;

    // using custom query to be able to do things like using regex or sorting with some properties
    const query = {};

    if (featured) query.featured = featured;
    if (company) query.company = company;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    // modifying name property to use regex
    if (name) {
        query.name = {
            $regex: name,
            $options: "i" // case insensitive
        }
    }

    // this is async. Not using await to be able to use sorting function (event loop doesn't run this right away)
    let result = Product.find(query);

    if (sort) {
        // replace commans with spaces (sort function requires this syntax)
        const sortString = sort.replaceAll(",", " ");
        result = result.sort(sortString);
    }
    else result = result.sort("createdAt");

    // select only specific fields
    if (fields) {
        const selectString = fields.replaceAll(",", " ");
        result = result.select(selectString);
    }

    // pagination
    // if results = 30, limit = 10, page = 2, then skip = 10 (shows 10 results)
    // if results = 35, limit = 10, page = 3, then skip = 30 (shows 5 results)
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit

    result = result
        .skip(skip)
        .limit(limit);

    const products = await result;
    res.status(200).json({ resultsAmount: products.length, products });
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
}