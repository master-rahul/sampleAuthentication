// Express Server Rwauirement
const express = require('express');
const port = 8000;
const cookieParser = require('cookie-parser');       // Fetching cookie-parser to access cookies in request and resposes.
const routes = require('./routes/index');           // Routes
const bodyParser = require('body-parser');          // Body-Parser
const db = require('./config/mongoose');            // Database
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');
const MongoStore = require('connect-mongo');                        // For storing session cookie so that cookies are not reset when server is restarted.
const app = express();

app.set('view engine', 'ejs');                      // View Engine 
app.set('views', './views');                        // View Engine Path

app.use(express.static('./assets'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    name : 'sample',
    secret : 'hello',
    saveUninitialized : false,
    resave : false,
    cookie: { maxAge: (1000 * 60 * 20)},
    store: MongoStore.create(
        {                                      // mongo store is used to store cookie in db.
            mongoUrl: 'mongodb://localhost/sampleAuthentication',
            autoRemove: 'disabled',
        }, function (error) {
            console.log(error || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);
app.use('/', routes);



app.listen(port, function(error) {
    if(error) console.log('Error : Starting Express Server : ', error);
    else console.log('Success : Starting Express Server');
});