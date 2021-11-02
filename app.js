const express = require('express');
const { User } = require('./models');

const app = express();
app.set('view engine', 'pug')

//GET, /
app.get('/', async(req, res) => {
    const users = await User.findAll();
    // const username = user.username
    res.render('index', {title: 'Breaddit', users})
})


const port = 8080;
app.listen(port, () => console.log(`Server is running on port ${port}.... :D`))