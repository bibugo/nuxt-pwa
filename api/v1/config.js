module.exports = {
    secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
    unless: [
        '/auth/login',
    ],
    optional: [
        '/inspire',
    ],
    mongourl: 'mongodb://host.docker.internal:27017/nuxt-pwa',
}