module.exports = function (req, res, next) {
    res.jsonError = function (message, status, code) {
        return res.status(status || 400).json({
            errors: {
                message: message,
                code: code
            }
        });
    }
    next()
}
