// async wrapper
const async = require("../middleware/asyncWrapper");

const getAllProducts = async(async (req, res) => {
    res.status(200).send("Products array");
});

module.exports = {
    getAllProducts
}