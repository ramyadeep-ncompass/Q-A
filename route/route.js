const router = require("express").Router();
const { login } = require('../controller/user-controller');
const { createNewPost } = require('../controller/post-controller');
const { authenticateUserToken } = require('../middlewares/authenticate-user-token');

router.post('/login', login);

router.use(authenticateUserToken);

router.post('/new-post', createNewPost);


module.exports = { router };