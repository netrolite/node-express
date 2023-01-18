function login(req, res) {
    res.send("Fake login");
}

function dashboard(req, res) {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        message: "Hello, John",
        secret: `Your lucky number: ${luckyNumber}`
    }); 
}

module.exports = {
    login,
    dashboard
}