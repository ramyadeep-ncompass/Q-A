const router = require("express").Router();
const { login } = require('../controller/user-controller');
const { createNewPost, updatePost, deletePost } = require('../controller/post-controller');
const { authenticateUserToken } = require('../middlewares/authenticate-user-token');

const { validateLogin } = require('../middlewares/login-input-validation');
const { validateNewPost } = require('../middlewares/new-post-validation');
const { validatePostUpdateRequest } = require('../middlewares/post-update-validation');

router.post('/login', validateLogin, login);

router.use(authenticateUserToken);

router.post('/new-post', validateNewPost, createNewPost);

router.patch('/update', validatePostUpdateRequest, updatePost);

router.delete('/delete', deletePost);

module.exports = { router };