const { model } = require('mongoose');
const { Router } = require('express');
const router = Router();

const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: './tmp/' })

const User = model('User');

router.post('/auth/login', function (req, res, next) {
    let username, password
    if (!(username = req.body.username)) return res.status(422).json({ errors: { username: "can't be blank" } });
    if (!(password = req.body.password)) return res.status(422).json({ errors: { password: "can't be blank" } });

    User.findOne({ username: username }).then(function (user) {
        if (!user) return res.sendStatus(401);
        if (!user.validPassword(password)) return res.sendStatus(401);
        const { token, refreshToken } = user.generateJWT()
        return res.status(200).json({ token, refreshToken });
    }).catch(next);
});

router.post('/auth/refresh', function (req, res, next) {
    if (req.payload.type !== 'refresh') return res.status(422).json({ errors: { refresh_token: "isn't a refresh token" } });

    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return res.status(200).json(user.generateJWT());
    }).catch(next);
});

router.get('/user', function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        return res.json({ user: user.toJSON() });
    }).catch(next);
});

router.post('/user', function (req, res, next) {
    const user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save().then(function () {
        return res.json({ user: user.toJSON() });
    }).catch(next);
});

router.post('/user/avatar', upload.single('avatar_file'), function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        user.avatar.data = fs.readFileSync(req.file.path)
        user.avatar.contentType = req.file.mimetype;
        user.save();
        fs.unlink(req.file.path, () => void 0)
        return res.json('data:'+user.avatar.contentType+';base64,'+user.avatar.data.toString('base64'));
    }).catch(next);
});

router.get('/user/avatar', upload.single('avatar_file'), function (req, res, next) {
    User.findById(req.payload.id).then(function (user) {
        if (!user) { return res.sendStatus(401); }
        res.send('data:'+user.avatar.contentType+';base64,'+user.avatar.data.toString('base64'))
    }).catch(next);
});

module.exports = router;