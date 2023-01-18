const Product = require("../models/Product");
const setQueryItems = require("./functions/setQueryItems");
const pagination = require("./functions/pagination");
const sortItems = require("./functions/sortItems");
const selectFields = require("./functions/selectFields");
const numericFiltering = require("./functions/numericFiltering");


async function getAllProducts(req, res) {
    const { name, featured, company, price, rating, sort, fields, page, limit, numericFilters } = req.query;
    let query = setQueryItems(name, featured, company, price, rating);
    query = numericFiltering(query, numericFilters); // filters like price<100
    
    let products = Product.find(query); // returns a promise
    products = sortItems(products, sort);
    products = selectFields(products, fields);
    products = pagination(products, page, limit);

    products = await products;
    res.status(200).json({ resultsAmount: products.length, products });
}


module.exports = {
    getAllProducts,
}