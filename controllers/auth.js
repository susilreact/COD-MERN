const User = require('../models/user');
const { validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const errors = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: 'Not able to save user in DB',
            });
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
        });
    });
};

exports.signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;
    
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
        });
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
           return res.status(400).json({
                error: 'USER email not exists',
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'email and password do not match',
            });
        }

        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        // put token in browser cookie
        res.cookie('token', token, { expire: new Date() + 9999 });

        //send response to frontend
        const { _id, name, email, role } = user;
        res.json({ token, user: { _id, name, email, role } });
    });

    
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'User Signout Successfully',
    });
};

//proteacted routes

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    algorithms:['RS256'],
     //userProperty: "auth",
});

exports.isAuthenticated =(req, res, next)=>{
    const checker = req.profile &&req.auth && req.profile._id == req.auth._id

    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();

}

exports.isAdmin =(req, res, next)=>{
    if(res.profile.role === 0){
        return res.status(403).json({
            error:"YOU ARE NOT ADMIN, access denied"
        })
    }
    next();
}