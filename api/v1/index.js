const { json, urlencoded } = express = require('express');
const cors = require('cors');

const app = express()
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

require('./db');

app.use(require('./middleware/auth'));

app.use(require('./routes'));

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(require('./middleware/error'))

module.exports = app;