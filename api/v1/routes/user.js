const { model } = require('mongoose');
const { Router } = require('express');
const router = Router();

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './tmp/' })

const User = model('User');

router.post('/auth/login', async function (req, res, next) {
    if (!req.body.username) return res.status(422).json({ errors: { username: "can't be blank" } });
    if (!req.body.password) return res.status(422).json({ errors: { password: "can't be blank" } });

    try {
        const user = await User.findByCredentials(
            req.body.username,
            req.body.password
        );
        const { token, refreshToken } = user.generateJWT()
        return res.status(200).json({ token, refreshToken });
    } catch (e) {
        res.status(401).send();
    }
});

router.post('/auth/refresh', function (req, res, next) {
    if (req.payload.type !== 'refresh') return res.status(422).json({ errors: { refresh_token: "isn't a refresh token" } });
    res.status(200).json(req.user.generateJWT());
});

router.get('/user', function (req, res, next) {
    res.json({ user: req.user.toJSON() });
});

router.patch('/user', async function (req, res, next) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['phone', 'email', 'password'];

    if (req.body['password'] && req.body['password'] !== req.body['passwordconfirm']) {
        return res.status(400).send({
            errors: {
                message: 'password not confirm!'
            }
        });
    }

    try {
        updates.forEach(update => {
            if (!!req.body[update] && allowedUpdates.includes(update)) {
                req.user[update] = req.body[update]
            }
        });
        await req.user.save();
        res.json({ user: req.user.toJSON() });
    } catch (e) {
        res.status(400).send(e);
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
    user.avatar.data = fs.readFileSync(req.file.path)
    user.avatar.contentType = req.file.mimetype;
    user.save();
    fs.unlink(req.file.path, () => void 0)
    return res.json('data:' + user.avatar.contentType + ';base64,' + user.avatar.data.toString('base64'));
});

router.get('/user/avatar', function (req, res, next) {
    res.send('data:' + req.user.avatar.contentType + ';base64,' + req.user.avatar.data.toString('base64'))
});

module.exports = router;