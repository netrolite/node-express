const Product = require("../models/Product");
const setQueryItems = require("./functions/setQueryItems");
const pagination = require("./functions/pagination");
const sortItems = require("./functions/sortItems");
const selectFields = require("./functions/selectFields");


async function getAllProducts(req, res) {
    const { name, featured, company, price, rating, sort, fields, page, limit } = req.query;
    const query = setQueryItems(name, featured, company, price, rating);
    
    // this returns a promise
    let products = Product.find(query);
    products = sortItems(products, sort);
    products = selectFields(products, fields);
    products = pagination(products, page, limit);

    products = await products;
    res.status(200).json({ resultsAmount: products.length, products });
}


module.exports = {
    getAllProducts,
}