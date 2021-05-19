const express = require('express');
const router = express.Router();
const { signout, signup } = require('../controllers/auth');
const { check } = require('express-validator');


router.post(
    '/signup',
    [
        check('name', 'name Should be atleast 3 charecter').isLength({
            min: 3,
        }),
        check('email', 'Email is required').isEmail(),
        check('password', 'password Should have atleast 6 charecter').isLength({
            min: 6,
        }),
    ],
    signup
);
router.get('/signout', signout);



module.exports =router;