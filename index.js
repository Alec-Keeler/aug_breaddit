const { User, Post, Subbreaddit, sequelize, Sequelize: {Op} } = require('./models');


// methods for creating new records: build() (save()), create()
async function buildUser(username, email, password) {
    const user = User.build({
        username: username,
        email: email,
        password: password
    })

    await user.save();

    await sequelize.close();
}

// buildUser('Cub', 'cub@cub.cub', 'cublikesbread');

async function createPost(title, content, userId, subId) {
    const post = await Post.create({
        title,
        content,
        userId,
        subId
    })

    await sequelize.close()
}

// createPost('Another Title', 'Here is another picture', 3, 2)

async function findUserByPk(userId) {
    const user = await User.findByPk(userId)
    console.log(user)

    await sequelize.close()
}

// findUserByPk(3)

async function findUserByEmail(email) {
    const user = await User.findOne({
        where: {
            email
        }
    })

    console.log(user._previousDataValues.username)
    await sequelize.close()
}

// findUserByEmail('chris@chris.com');

async function getAllPosts() {
    const posts = await Post.findAll();

    console.log(posts)
    await sequelize.close()
}

// getAllPosts()

async function findSomePosts(keyWord) {
    const posts = await Post.findAll({
        where: {
            content: {
                [Op.substring]: keyWord
            }
        }
    })
    console.log(posts)
    await sequelize.close()
}

// findSomePosts('picture');

async function updateUser(userId, username) {
    const user = await User.findByPk(userId);
    console.log(user.username)
    user.username = username;
    await user.save();
    const updatedUser = await User.findByPk(userId);
    console.log(updatedUser.username)
    await sequelize.close();
}

// updateUser(1, 'Alec Keeler');

async function deletePost(postId) {
    const post = await Post.findByPk(postId);

    await post.destroy();
    await sequelize.close()
}

// deletePost(6);


async function findUserAndPosts(userId) {
    const user = await User.findByPk(userId, {
        include: {
            model: Post
        }
    })

    console.log(user.Posts[0].title);

    await sequelize.close()
}

// findUserAndPosts(3);

async function findUserSubs(email) {
    const user = await User.findOne({
        where: {
            email
        },
        include: Subbreaddit
    })

    console.log(user)
    await sequelize.close()
}

// findUserSubs('alec@alec.com')

// Syntax for queries where we want to include more than one model that is associated
// to the model we're querying
async function getPostAndThings(postId) {
    const post = await Post.findByPk(postId, {
        include: [User, Subbreaddit]
    })

    console.log(post);
    await sequelize.close()
}

// getPostAndThings(4);

async function getUserPostsAndSubs(userId) {
    const user = await User.findByPk(userId, {
        include: {
            model: Post,
            include: Subbreaddit
        }
    })

    // console.log(
    //     user.username,
    //     user.Posts[0].title,
    //     user.Posts[0].Subbreaddit.name
    // )
    console.log(user)
    await sequelize.close()
}

// getUserPostsAndSubs(2)

async function getLotsOfThings(userId) {
    const user = await User.findByPk(userId, {
        include: {
            model: Post,
            include: {
                model: Subbreaddit,
                include: User
            }
        }
    })

    console.log(
        user.username,
        user.Posts[0].title,
        user.Posts[0].Subbreaddit.name,
        user.Posts[0].Subbreaddit.Users
    )
    await sequelize.close()
}

getLotsOfThings(1)