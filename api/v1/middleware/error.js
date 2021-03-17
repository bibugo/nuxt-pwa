const errorHandler = function (err, req, res, next) {
    let status, errors

    if (err.name === 'UnauthorizedError') {
        status = 401
        errors = {
            message: err.message || 'invalid token',
            code: err.code
        }
    } else if (err.name === 'ValidationError') {
        status = 422
        errors = Object.keys(err.errors).reduce(function (errors, key) {
            errors.push({ message: err.errors[key].message })
            return errors;
        }, [])
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