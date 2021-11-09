const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const { User } = require('../db/models');
const bcrypt = require('bcryptjs');

const csrfProtection = csrf({ cookie: true })

router.get('/signup', csrfProtection, (req, res) => {
    res.render('sign-up', {csrfToken: req.csrfToken(), title: 'Sign Up'})
})

router.post('/signup', csrfProtection, async(req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })
    req.session.user = {username: user.username, userId: user.id}
    res.redirect('/')
})

router.get('/login', csrfProtection, (req, res) => {
    // console.log('hello')
    res.render('log-in', { csrfToken: req.csrfToken(), title: 'Log Up' })
})

router.post('/login', csrfProtection, async(req, res) => {
    const {email, password} = req.body;
    // console.log('hello from post route')
    const user = await User.findOne({
        where: {
            email
        }
    })

    // console.log(user);

    const isPass = await bcrypt.compare(password, user.password)
    if (isPass) {
        console.log('Successful login!')
        req.session.user = { username: user.username, userId: user.id }
        res.redirect('/')
    } else {
        res.redirect('/users/login')
    }
})

router.get('/logout', (req, res) => {
    //TO DO
    delete req.session.user
    // res.redirect('/');
    req.session.save(() => res.redirect('/'))
})


module.exports = router;