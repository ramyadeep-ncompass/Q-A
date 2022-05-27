const router = require("express").Router();
const { login } = require('../controller/user-controller');
const { createNewPost } = require('../controller/post-controller');
const { authenticateUserToken } = require('../middlewares/authenticate-user-token');

const { validateLogin } = require('../middlewares/login-input-validation');
const { validateNewPost } = require('../middlewares/new-post-validation');

router.post('/login', validateLogin, login);

router.use(authenticateUserToken);

router.post('/new-post', validateNewPost, createNewPost);


module.exports = { router };