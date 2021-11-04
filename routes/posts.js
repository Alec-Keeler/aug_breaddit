const express = require('express');
const { Post, Subbreaddit } = require('../db/models');
const csrf = require('csurf');

const csrfProtection = csrf({cookie: true})

const router = express.Router()
// /posts
// router.get(/^\/posts$/, async (req, res) => {
router.get('/', async (req, res) => {
    // res.send('Hello from posts page')
    console.log(req.banana)
    const posts = await Post.findAll()
    res.render('posts', { title: 'Breaddit Posts', posts })
})

router.get('/:id(\\d+)', async (req, res) => {
    console.log(req.params.id)
    const post = await Post.findByPk(req.params.id)
    console.log(post.title)
    res.send('We got a post')
})

const contentChecker = (req, res, next) => {
    const { content } = req.body;
    req.errors = []
    if (content.length < 10) {
        req.errors.push('Content is too short')
        next()
    } else {
        next()
    }
}

router.get('/new', csrfProtection, async(req, res) => {
    const subs = await Subbreaddit.findAll()
    res.render('new-post', {title: 'Create Post', subs, csrfToken: req.csrfToken(), errors: [], post: {}})
})

router.post('/new', csrfProtection, contentChecker, async(req, res) => {
    const { title, content, subId } = req.body
    const subs = await Subbreaddit.findAll()
    // console.log(req.body.subId, subs[0].id)
    req.body.subId = parseInt(req.body.subId)
    if (req.errors.length > 0) {
        res.render('new-post', { title: 'Create Post', subs, csrfToken: req.csrfToken(), errors: req.errors, post: req.body})
    } else {
        const post = await Post.create({
            title,
            content,
            userId: 1,
            subId
        })
        res.redirect('/posts')
    }
})

module.exports = router;