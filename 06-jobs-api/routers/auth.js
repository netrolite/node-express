const express = require("express");
const router = express.Router();
const {
    register,
    login
} = require("../controllers/auth");
const validateLoginCredentials = require("../middleware/validateLoginCredentials");


router.post("/register", register);
router.post("/login", validateLoginCredentials, login);


module.exports = router;