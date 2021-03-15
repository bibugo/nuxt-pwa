const { connect } = require('mongoose');
const { mongourl } = require('./config');

connect(mongourl,
    {
        "auth": {
            "authSource": "admin"
        },
        "user": "root",
        "pass": "1234"
    }).then(
        () => { console.log('Database connection is successful') },
        err => { console.log('Error when connecting to the database' + err) }
    );

require('./models/User');
