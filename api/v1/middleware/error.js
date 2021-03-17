const errorHandler = function (err, req, res, next) {
    let status, errors

    if (err.name === 'UnauthorizedError') {
        status = 401
        errors = {}
        errors.message = err.message || 'invalid token'
        if (!!err.code) errors.code = err.code
    } else if (err.name === 'ValidationError') {
        status = 422
        errors = Object.keys(err.errors).reduce(function (errors, key) {
            errors[key] = err.errors[key].message;
            return errors;
        }, {})
    } else if (err.code && err.code == 11000) {
        const key = Object.keys(err.keyValue)[0]
        status = 422
        errors = {
            message: 'duplicate key ',
            code: key + ' = ' + err.keyValue[key]
        }
    }

    errors = errors || {
        message: err.message,
        code: err.code,
    }

    errors.err = err  //debug
    console.log(err.stack);  //debug

    res.status(status || err.status || 500);
    res.json({ errors });
}

module.exports = errorHandler;