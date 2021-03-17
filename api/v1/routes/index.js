const { Router } = require('express');
const router = Router();

router.use('/', require('./user'));

router.get('/inspire', (req, res) => {
  res.json({
    words: 'First, solve the problem. Then, write the code.',
    author: 'John Johnson'
  })
})

module.exports = router;