const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserSchema = require('../models/user');

passport.use(new LocalStrategy({
        usernameField : 'email',
    },
    function(email , password, done) {
        UserSchema.findOne({email : email}, function(error, user){
            if(error) {
                console.log('Error finding user in Database for Authentication');
                return done(error);
            }else if(!user){
                console.log('User not present in Database for Authentication');
                return done(null, false);
            }else{
                if(user.password != password) {
                    console.log('Password Invalid');
                    return done(null, false);
                }
                console.log('User present in Database for Authentication');
                return done(null, user);
            }
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log('serialize');
    done(null, user.id);
});
// de-serialize the user from the keys present in cookie.
passport.deserializeUser(function (id, done) {
    console.log('de-serialize')
    UserSchema.findById(id, function (error, user) {
        if (error) {
            console.log('Error in finding User');
            return done(error);
        } else {
            console.log('User is found');
            return done(null, user);
        }
    });
});


passport.checkAuthentication = function (request, response, next) {
    console.log(request.isAuthenticated());
    if(request.isAuthenticated()) return next();
    return response.redirect('/user/sign-in');   
}

passport.setAuthenticated = function (request, response, next) {
    console.log('set-authenticated')
    if(request.isAuthenticated()) response.locals = request.user;
    return next();
}

passport.redirectAuthenticated = function(request, response, next){
    console.log('redirect user');
    if(request.isAuthenticated()) return response.redirect('/profile');
    return next();
}


module.exports = passport;