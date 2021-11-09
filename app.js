const express = require('express');
const { User, Post } = require('./db/models');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static('./public'))

app.use('/posts', postsRouter);
app.use('/users', usersRouter);
// app.use('/comments', postsRouter);

const banana = (req, res, next) => {
    req.banana = true;
    next()
}

app.use(banana)
//GET, /
app.get('/', async(req, res) => {
    const users = await User.findAll();
    console.log(req.banana)
    if (req.banana) {
        res.render('index', {title: 'Breaddit', users})
    } else {
        res.send("Where is the banana???")
    }
    // const username = user.username
})

// top level - /posts/, /users
// nested resource - /posts/1, /users/4/profile, /posts/comments
// app.all(/^\/\w+\/?$/, (req, res) => {
//     res.send('Page Not Found')
// })

app.use((req, res, next) => {
    console.log('This is our 404 handler')
    const err = new Error('This page could not be found')
    err.status = 404;
    next(err)
})

app.use((err, req, res, next) => {
    console.log('Inside generic error handler')
    // next()
})

app.use((req, res, next) => {
    console.log('inside test middleware');
})

// const port = 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}.... :D`))

module.exports = app;