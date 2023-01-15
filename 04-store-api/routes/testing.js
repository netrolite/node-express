const express = require("express");
const router = express.Router();
const {
    getAllProductsTesting
} = require("../controllers/products");

router.route("/products")
    .get(getAllProductsTesting)

module.exports = router;