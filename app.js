const express = require('express');
const { User } = require('./models');

const app = express();

//GET, /
app.get('/', async(req, res) => {
    // const user = await User.findByPk(1);
    // console.log(user.username)
    res.send('Hello from Breaddit!')
})


const port = 8080;
app.listen(port, () => console.log(`Server is running on port ${port}.... :D`))