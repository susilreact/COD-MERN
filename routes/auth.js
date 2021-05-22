const express = require('express');
const router = express.Router();
const { signout, signup, signin, isSignedIn } = require('../controllers/auth');
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

router.post(
    '/signin',
    [
        check('email', 'Email is required').isEmail(),
        check('password', 'password is required').isLength({
            min: 6,
        }),
    ],
    signin
);
router.get('/signout', signout);

router.get('/testroute', isSignedIn, (req, res) => {
    res.send('A protected Route');
});

module.exports = router;
