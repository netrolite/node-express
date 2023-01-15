// helps avoid trycatch blocks everywhere
function asyncWrapper(callback) {
    return async function (req, res, next) {
        try {
            await callback(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = asyncWrapper;