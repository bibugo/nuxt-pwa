const config = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
    unless: [
        '/auth/login',
        '/auth/passwordreset',
    ],
    optional: [
        '/inspire',
    ],
    mongourl: 'mongodb://host.docker.internal:27017/nuxt-pwa',
}

// global functions
const AuthError = function (message, code, status, error) {
    this.name = "AuthError";
    this.message = message;
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    this.code = code || '';
    this.status = status || 401;
    this.inner = error || { message: message, code: code };
}
AuthError.prototype = Object.create(Error.prototype);
AuthError.prototype.constructor = AuthError;

module.exports = { ...config, AuthError };