const router = require("express").Router();
const { login } = require('../controller/user-controller');
const { createNewPost, updatePost, deletePost } = require('../controller/post-controller');
const { authenticateUserToken } = require('../middlewares/authenticate-user-token');

router.post('/login', login);

router.use(authenticateUserToken);

router.post('/new-post', createNewPost);

router.patch('/update', updatePost);

router.delete('/delete', deletePost);

module.exports = { router };