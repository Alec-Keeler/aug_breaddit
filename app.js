const express = require('express');
const { User, Post } = require('./models');
const postsRouter = require('./routes/posts');

const app = express();
app.set('view engine', 'pug');
app.use('/posts', postsRouter);
// app.use('/comments', postsRouter);

//GET, /
app.get('/', async(req, res) => {
    const users = await User.findAll();
    // const username = user.username
    res.render('index', {title: 'Breaddit', users})
})

// // /posts
// app.get(/^\/posts$/, async(req, res) => {
//     // res.send('Hello from posts page')
//     const posts = await Post.findAll()
//     res.render('posts', {title: 'Breaddit Posts', posts})
// })

// app.get('/posts/:id(\\d+)', async(req, res) => {
//     console.log(req.params.id)
//     const post = await Post.findByPk(req.params.id)
//     console.log(post.title)
//     res.send('We got a post')
// })

// top level - /posts/, /users
// nested resource - /posts/1, /users/4/profile, /posts/comments
app.all(/^\/\w+\/?$/, (req, res) => {
    res.send('Page Not Found')
})


const port = 8080;
app.listen(port, () => console.log(`Server is running on port ${port}.... :D`))