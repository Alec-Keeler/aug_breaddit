const express = require('express');
const { Post } = require('../models');

const router = express.Router()
// /posts
// router.get(/^\/posts$/, async (req, res) => {
router.get('/', async (req, res) => {
    // res.send('Hello from posts page')
    const posts = await Post.findAll()
    res.render('posts', { title: 'Breaddit Posts', posts })
})

router.get('/:id(\\d+)', async (req, res) => {
    console.log(req.params.id)
    const post = await Post.findByPk(req.params.id)
    console.log(post.title)
    res.send('We got a post')
})

router.get('/new', (req, res) => {
    res.render('new-post', {title: 'Create Post'})
})

router.post('/new', (req, res) => {
    console.log('We got to our first post router')
})

module.exports = router;