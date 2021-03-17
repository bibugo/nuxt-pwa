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
const ClientError = function (status, message, code, error) {
    this.name = "ClientError";
    this.status = status || 401;
    this.message = message;
    Error.call(this, message);
    Error.captureStackTrace(this, this.constructor);
    if (!!code) this.code = code;
    this.inner = error || { message: this.message, code: this.code };
}
ClientError.prototype = Object.create(Error.prototype);
ClientError.prototype.constructor = ClientError;

module.exports = { ...config, ClientError };