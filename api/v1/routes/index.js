const { Router } = require('express');
const router = Router();

router.use('/', require('./user'));

router.get('/inspire', (req, res) => {
  res.json({
    words: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson'
  })
})

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    return res.jsonError('invalid token', 401, err.code)
  }
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }
  if (err.code && err.code == 11000) {
    const key = Object.keys(err.keyValue)[0]
    return res.jsonError('duplicate key ', 422, key + ' = ' + err.keyValue[key])
  }
  return next(err);
});

module.exports = router;