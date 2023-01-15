require("dotenv").config();
const connectDB = require("./db/connectDB");
const Product = require("./models/Product");
const jsonProducts = require("./products.json");

// connect to DB and populate it with jsonProducts
(async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log("Done");
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
})();