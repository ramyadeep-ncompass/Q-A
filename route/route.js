const router = require("express").Router();
const { login } = require('../controller/user-controller');
const {
    createNewPost,
    updatePost,
    deletePost,
    answerPost,
    getQuestions,
    getPostDetails
} = require('../controller/post-controller');

const { authenticateUserToken } = require('../middlewares/authenticate-user-token');

router.post('/login', login);

router.get('/questions', getQuestions);

router.get('/post-details', getPostDetails);

router.use(authenticateUserToken);

router.post('/new-post', createNewPost);

router.patch('/update', updatePost);

router.delete('/delete', deletePost);

router.post('/answer', answerPost);

module.exports = { router };