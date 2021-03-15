const expressJwt = require('express-jwt');
const { secret, optional, unless } = require('../config');

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

    return expressJwt({
        secret: secret,
        userProperty: 'payload',
        algorithms: ['HS256'],
        credentialsRequired: !isOptional,
        getToken: getTokenFromRequest
    }).unless({
        path: unless,
        useOriginalUrl: false
    })(req, res, next);
}

module.exports = auth;