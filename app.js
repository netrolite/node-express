const express = require("express");
const app = express();
const { products, people } = require("./data");


app.get("/", (req, res) => {
    res.send('<h1>Home Page</h1><div><a href="/api/products">Products</a></div>')
})


app.get("/api/products/search", (req, res) => {
    const { productName, limit } = req.query;

    if (productName) {
        let filteredProducts = products.filter(product => {
            const productNameLower = product.name.toLowerCase();
            const productNameQueryLower = productName.toLowerCase();

            // if name of product from array starts with product name from query
            return productNameLower.startsWith(productNameQueryLower);
        })

        if (limit) {
            filteredProducts = filteredProducts.slice(0, parseInt(limit));
        }

        res.status(200);
        res.json(filteredProducts);
    }
    else {
        res.status(400);
        res.send("Bad Request 400");
    }
})


app.get("/api/products/:productID", (req, res) => {
    const product = products.find(product => (
        product.id === parseInt(req.params.productID)
    ))

    if (product) res.json(product);
    else {
        res.status(404);
        let binary = "";
        for (let i = 0; i < 1936; i++) {
            binary += Math.floor(Math.random() * 2);
        }
        res.send(`<div style="word-break: break-all">${binary}</div>`);
    }
});


app.get("/api/products", (req, res) => {
    const productsNoDesc = products.map(product => {
        const { id, name, image, price } = product;
        return { id, name, image, price };
    })
    res.json(productsNoDesc);
})

app.listen(5000, () => {
    console.log("server listening on port 5000");
})
