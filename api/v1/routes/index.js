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
    return res.status(401).json({
      errors: {
        message: 'invalid token...',
      }
    });
  }
  return next(err);
});

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }
  if (err.code && err.code == 11000) {
    return res.status(422).json({
      errors: {
        message: 'duplicate key ' + Object.keys(err.keyValue)[0],
      }
    });
  }
  return next(err);
});

module.exports = router;