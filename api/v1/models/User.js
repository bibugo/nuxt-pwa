const { Schema, model } = require('mongoose');
const { randomBytes, pbkdf2Sync } = require('crypto');
const { sign } = require('jsonwebtoken');
const { secret } = require('../config');

const schema = new Schema({
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    hash: String,
    salt: String,
    email: String,
    phone: String,
    fullname: String,
    avatar: { data: Buffer, contentType: String },
}, { timestamps: true });

schema.methods.setPassword = function (password) {
    this.salt = randomBytes(16).toString('hex');
    this.hash = pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};
schema.methods.validPassword = function (password) {
    var hash = pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

schema.methods.generateJWT = function (isRefresh) {
    const token = sign({
        type: 'access',
        id: this._id,
    }, secret, { expiresIn: '30m' });
    const refreshToken = sign({
        type: 'refresh',
        id: this._id,
    }, secret, { expiresIn: '30d' });
    return { token, refreshToken }
};

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.salt;
        delete ret.hash;
        if (ret.avatar && ret.avatar.contentType && ret.avatar.data) ret.avatar = 'data:' + ret.avatar.contentType + ';base64,' + Buffer.from(ret.avatar.data).toString('base64')
        return ret;
    }
});

model('User', schema);
