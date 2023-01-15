const Product = require("../models/Product");

async function getAllProductsTesting(req ,res) {
    const query = "q";
    const products = await Product.find({
        name: { $regex: query }
    })
    res.status(200).json({ resultsAmount: products.length, products });
}

async function getAllProducts(req, res) {
    const { name, featured, company, price, rating } = req.query;

    // using queryObj so user can't use properties that don't exist
    let queryObj = {};
    // mongoose automatically converts string to boolean. Only accepts true and false. Everything else triggers an error
    if (name) queryObj.name = name;
    if (featured) queryObj.featured = featured; 
    if (company) queryObj.company = company;
    if (price) queryObj.price = price;
    if (rating) queryObj.rating = rating;

    const products = await Product.find(queryObj);
    res.status(200).json({ resultsAmount: products.length, products });
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
}