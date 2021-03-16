const { UnauthorizedError } = expressJwt = require('express-jwt');
const { secret, optional, unless } = require('../config');

const { model } = require('mongoose');
const User = model('User');

function getTokenFromRequest(req) {
    if (req.body && req.body.refresh_token) {
        return req.body.refresh_token
    } else if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
        req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

const auth = function (req, res, next) {
    let isOptional = false
    if (optional.includes(req.url)) {
        isOptional = true
    }

    const jwt = expressJwt({
        secret: secret,
        userProperty: 'payload',
        algorithms: ['HS256'],
        credentialsRequired: !isOptional,
        getToken: getTokenFromRequest
    }).unless({
        path: unless,
        useOriginalUrl: false
    });

    return jwt(req, res, async function (err) {
        if (err) {
            return next(err);
        }
        if (req.payload) {
            try {
                const user = await User.findById(req.payload.id).exec()
                if (!user) { return next(new UnauthorizedError('invalid_id', { message: 'User not exist' })); }
                req.user = user
                return next()
            } catch (err) {
                return next(new UnauthorizedError('invalid_id', err));
            };
        }
        return next();
    });
}

module.exports = auth;
