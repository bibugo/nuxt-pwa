const { model } = require('mongoose');
const { Router } = require('express');
const router = Router();
const { ClientError } = require('../config');

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './tmp/' })

const User = model('User');

router.post('/auth/login', async function (req, res, next) {
    if (!req.body.username) return next(new ClientError(422, "username can't be blank"));
    if (!req.body.password) return next(new ClientError(422, "password can't be blank"));

    try {
        const user = await User.findByCredentials(
            req.body.username,
            req.body.password
        );
        const { token, refreshToken } = user.generateJWT()
        return res.status(200).json({ token, refreshToken });
    } catch (err) {
        next(err)
    }
});

router.post('/auth/refresh', function (req, res, next) {
    if (req.payload.type !== 'refresh') return next(new ClientError(422, "refresh token not exist"));
    res.status(200).json(req.user.generateJWT());
});

router.get('/user', function (req, res, next) {
    res.json({ user: req.user.toJSON() });
});

router.patch('/user', async function (req, res, next) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['phone', 'email', 'password'];

    if (req.body['password'] && req.body['password'] !== req.body['passwordconfirm']) {
        return next(new ClientError(422, 'password not confirm!'))
    }

    try {
        updates.forEach(update => {
            if (!!req.body[update] && allowedUpdates.includes(update)) {
                req.user[update] = req.body[update]
            }
        });
        await req.user.save();
        return res.json({ user: req.user.toJSON() });
    } catch (err) {
        next(err);
    }
});

router.post('/user/new', function (req, res, next) {
    const user = new User(req.body);
    user.save().then(function () {
        return res.json({ user: user.toJSON() });
    }).catch(next);
});

router.post('/user/avatar', upload.single('avatar_file'), function (req, res, next) {
    const user = req.user
    try {
        user.avatar.data = fs.readFileSync(req.file.path)
        user.avatar.contentType = req.file.mimetype;
        user.save();
        fs.unlink(req.file.path, () => void 0)
        return res.json(user.avatarBase64());
    } catch (err) {
        next(err)
    }
});

router.get('/user/avatar', function (req, res, next) {
    res.send(req.user.avatarBase64())
});

module.exports = router;