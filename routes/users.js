const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { User } = require('../db/models');

const csrfProtection = csrf({ cookie: true })

// Display a signup form - done
// pug template - done
// Accept form with post router - done
// Display a login form - done
// pug tempalte - done
// Accept form with post router - done
// Route for logout

router.get('/signup', csrfProtection, (req, res) => {
    res.render('sign-up', {csrfToken: req.csrfToken(), title: 'Sign Up'})
})

router.post('/signup', csrfProtection, async(req, res) => {
    const { username, email, password } = req.body;

    const user = await User.create({
        username,
        email,
        password
    })
    res.redirect('/')
})

router.get('/login', csrfProtection, (req, res) => {
    // console.log('hello')
    res.render('log-in', { csrfToken: req.csrfToken(), title: 'Log Up' })
})

router.post('/login', csrfProtection, (req, res) => {
    const {email, password} = req.body;
    // console.log('hello from post route')
})

router.get('/logout', (req, res) => {
    //TO DO
})


module.exports = router;