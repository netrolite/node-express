async function register(req ,res) {
    res.send("register user");
}

async function login(req ,res) {
    res.send("login user");
}

module.exports = {
    register,
    login
}