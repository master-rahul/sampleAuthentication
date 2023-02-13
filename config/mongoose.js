const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sampleAuthentication');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in Connecting to Databas'));
db.once('open', function () { console.log('Successfully connected to Database') });

module.export = db;
