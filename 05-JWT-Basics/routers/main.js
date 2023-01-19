const express = require("express");
const router = express.Router();
const { login, dashboard } = require("../controllers/main/main");
const auth = require("../middleware/auth");

router.route("/dashboard")
    .get(auth, dashboard);

router.route("/login")
    .post(login);

module.exports = router;