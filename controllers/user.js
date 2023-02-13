const db = require('../config/mongoose');
const userSchema = require('../models/user');
module.exports.signIn = function (request, response) {
    return response.render('signIn', { title: 'Sign In' });
}
module.exports.signUp = function (request, response) {
    return response.render('signUp', { title: 'Sign Up' });
}
module.exports.add = function (request, response) {
    if (request.body.password != request.body.confirm_password) return response.redirect('back');
    userSchema.findOne({email : request.email}, function(error, user){
        if(error){
            console.log('Error in Searching User');
            return response.redirect('back');
        } 
        else if(!user){
            userSchema.create({
                    name: request.body.name,
                    email: request.body.email,
                    password: request.body.password
                },
                function (error) {
                    if (error) {
                        console.log("Already Existing User ");
                        return response.redirect('back');
                    }
                    console.log('New User Added In Database');
                    return response.redirect('/user/sign-in');
                });
        } else {
            console.log('User Already Exists');
            return response.redirect('back');
        }
    });
    
}

