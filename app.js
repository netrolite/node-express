const express = require("express");
const app = express();
const { products, people } = require("./data");

app.get("/", (req, res) => {
    res.send('<h1>Home Page</h1><div><a href="/api/products">Products</a></div>')
})


app.get("/api/products/search", (req, res) => {
    // remove "desc" (description) property from all products
    const productsNoDesc = products.map(product => {
        const { id, name, image, price } = product;
        return { id, name, image, price };
    })

    // always send 200 status
    res.status(200);
    // always send json
    res.header("Content-Type", "application/json");
    
    // product name and product limit (limits how many are sent back)
    const { name, limit } = req.query;

    // response to send
    // response.data may change
    let response = {
        ok: true,
        data: productsNoDesc
    }

    // if name or limit are present in the query
    if (name || limit) {
        let filteredProducts = productsNoDesc;

        // filter out products whose name doesn't start with "name" from query
        if (name) {
            filteredProducts = filteredProducts.filter(product => {
                const nameLower = product.name.toLowerCase();
                const nameQueryLower = name.toLowerCase();
                
                // if name of product from array starts with product name from query
                return nameLower.startsWith(nameQueryLower);
            })
        }
        
        // limit products array if "limit" is present in the query
        if (limit) {
            filteredProducts = filteredProducts.slice(0, parseInt(limit));
        }

        // update response.data
        response.data = filteredProducts;

        res.send(JSON.stringify(response, null, 2));
    }
    else {
        res.send(JSON.stringify(response, null, 2));
    }
})


app.get("/api/products/:productID", (req, res) => {
    // always send json
    res.header("Content-Type", "application/json");
    const product = products.find(product => (
        product.id === parseInt(req.params.productID)
    ))
        

    if (product) {
        res.status(200);
        res.send(JSON.stringify(
            {
                ok: true,
                data: product
            },
            null,
            2
        ))
    }
    else {
        res.status(404);
        res.send(JSON.stringify(
            {
                ok: false,
            },
            null,
            2
        ))
    }
});


app.get("/api/products", (req, res) => {
    // remove "desc" (description) property from all products
    const productsNoDesc = products.map(product => {
        const { id, name, image, price } = product;
        return { id, name, image, price };
    })

    const response = {
        ok: true,
        data: productsNoDesc
    }

    res.status(200);
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(response, null, 2));
})

app.listen(5000, () => {
    console.log("server listening on port 5000");
})
