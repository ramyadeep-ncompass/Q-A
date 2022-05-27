const router = require("express").Router();
const { login } = require('../controller/user-controller');
const { createNewPost, updatePost, deletePost } = require('../controller/post-controller');
const { authenticateUserToken } = require('../middlewares/authenticate-user-token');

const { validateLogin } = require('../middlewares/login-input-validation');
const { validateNewPostRequest } = require('../middlewares/new-post-validation');
const { validatePostDeleteRequest } = require('../middlewares/post-delete-validation');
const { validatePostUpdateRequest } = require('../middlewares/post-update-validation');

router.post('/login', validateLogin, login);

router.use(authenticateUserToken);

router.post('/new-post', validateNewPostRequest, createNewPost);

router.patch('/update', validatePostUpdateRequest, updatePost);

router.delete('/delete', validatePostDeleteRequest, deletePost);

module.exports = { router };