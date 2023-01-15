function getAllProducts(req, res) {
    res.status(200).send("Products array");
}

module.exports = {
    getAllProducts
}