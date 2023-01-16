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
    const { name, featured, company, price, rating, sort } = req.query;

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
    console.log("query:", query);
    let result = Product.find(query);

    if (sort) {
        const sortString = sort.replace(/\,/, " ");
        console.log(sortString);
        result = result.sort(sortString);
    }
    else result = result.sort("createdAt");

    const products = await result;

    res.status(200).json({ resultsAmount: products.length, products });
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
}