const Product = require("../models/Product");

async function getAllProductsTesting(req ,res) {
    const query = "d";
    const products = await Product.find({
        name: {
            $regex: query,
            $options: "i"
        }
    })
    res.status(200).json({ resultsAmount: products.length, products });
}

async function getAllProducts(req, res) {
    const { name, featured, company, price, rating } = req.query;

    // using custom query so user can't use properties that don't exist
    let query = {};

    if (name) {
        query.name = {
            $regex: name,
            $options: "i" // case insensitive
        }
    }
    // mongoose automatically casts string to boolean. Only accepts "true" and "false". Everything else throws an error
    if (featured) query.featured = featured; 
    if (company) query.company = company;
    if (price) query.price = price;
    if (rating) query.rating = rating;

    const products = await Product.find(query);
    res.status(200).json({ resultsAmount: products.length, products });
}

module.exports = {
    getAllProducts,
    getAllProductsTesting
}