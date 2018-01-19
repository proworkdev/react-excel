var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../../config/config');
var User = require('../models/user');
var bcrypt = require('bcryptjs');
var path = require('path');


/**
 * login api
 */
router.post('/login', function(req, res, next) {
    //getting parametrs
    var email = req.body.email;
    var password = req.body.password;
    //checking if user exists 
    User.findOne({ 'email': email }, function(err, user) {
        if (err) {  //if any error
            res.status(401).json({ message: 'Error on the server.', status: 401 })
        } else if (!user) { //if user doesn't exist
            res.status(401).json({ message: 'No user found', status: 401 })
        } else { //if everything goes right
            //comparing passwords
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (!passwordIsValid) {
                res.status(401).json({ message: 'Please check your password', status: 401 })
            } else {    //if pssword matches
                var userId = user._id; //get user id
                //checking if user exists 
                User.findOne({ _id: userId }, function(err, user) {
                    if (err) {
                        res.status(401).json({ message: 'have an error.', status: 401 })
                    } else {
                        //token assigned
                        var token = jwt.sign({ user }, config.secret, { expiresIn: '1h' });
                        //user successfully logged in
                        res.status(200).json({ auth: true, token: token, message: "login success", status: 200 })
                    }
                });
            }
        }
    });
});


/**
 * register api
 */
router.post('/register', function(req, res, next) {
    //checking if user exists 
    User.find({}, function(err, user) {
        if (err)
            res.json({ message: 'error in internal server', status: 500 });
        else {
            //registering new user
            var user = new User();
            user.email = req.body.email; //set email
            user.password = bcrypt.hashSync(req.body.password); //set password
            user.token = req.body.token;    
            user.save(function(err, user) {     //save user
                if (err) {
                    res.status(401).json({ message: 'data not saved.', status: 401 })
                } else {
                    //user successfully saved
                    res.json({ message: 'done.', status: 200 })
                }
            })
        }
    })
});



/****************************************************************/
module.exports = router; 
/****************************************************************/