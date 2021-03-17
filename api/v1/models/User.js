const { Schema, model } = require('mongoose');
const { randomBytes, pbkdf2Sync } = require('crypto');
const { sign } = require('jsonwebtoken');
const { secret, ClientError } = require('../config');

const schema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: "username is duplicate",
        required: [true, "username can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'username is invalid'],
        index: true
    },
    password: String,
    salt: String,
    email: String,
    phone: String,
    fullname: String,
    avatar: { data: Buffer, contentType: String },
}, { timestamps: true });
schema.plugin(require('mongoose-beautiful-unique-validation'));

schema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new ClientError(401, 'Unable to login');
    }
    const hash = pbkdf2Sync(password, user.salt, 10000, 512, 'sha512').toString('hex');
    if (user.password !== hash) {
        throw new ClientError(401, 'Unable to login');
    }
    return user;
}

schema.methods.generateJWT = function () {
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

schema.methods.randomToken = function (length) {
    return randomBytes(length ? length : 32).toString("hex")
}

schema.methods.avatarBase64 = function () {
    if (this.avatar && this.avatar.contentType && this.avatar.data) {
        return 'data:' + this.avatar.contentType + ';base64,' + Buffer.from(this.avatar.data).toString('base64')
    }
    return this.avatar
}

schema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.salt = randomBytes(16).toString('hex');
        user.password = pbkdf2Sync(user.password, this.salt, 10000, 512, 'sha512').toString('hex');
    }
    next();
});

schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.salt;
        delete ret.password;
        ret.avatar = doc.avatarBase64()
        return ret;
    }
});

const User = model('User', schema);
module.exports = User;
