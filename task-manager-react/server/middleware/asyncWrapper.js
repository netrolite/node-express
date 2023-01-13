/*
    const controller = asyncWrapper(async (req, res) => {
        res.send("user data");
    })
*/

function asyncWrapper(callback) {
    // "req", "res" and "next" are supplied by express
    // returning an async function to be able to use await inside of it
    return async function (req, res, next) {
        try {
            // "callback" is an async function. async fucntions always return a promise so I'm using await before it
            await callback(req, res, next);
        } catch (err) {
            // handle the error
            // using "throw new Error(err)" is pointless. It's literally catching an error just to throw it again
            next(err);
        }
    }
}

module.exports = asyncWrapper;