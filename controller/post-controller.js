const { ResponseStructure } = require('../utilities/response-structure');
const { ApiError } = require('../utilities/api-error');
const { runQueryAsync } = require('../utilities/db');
const { getSignedUserId } = require('../controller/get-user-id');

const createNewPost = async(req, res, next) => {
    const signedUserEmail = req.user.email;
    // console.log(signedUserEmail);
    const newPost = {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
    }

    let query = `INSERT INTO posts (user_id,title,description,tags) VALUES (?,?,?,?)`;
    let userId = await getSignedUserId(signedUserEmail);
    let queryParams = [userId, newPost.title, newPost.description, newPost.tags]
    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error));
        return;
    }

    ResponseStructure.contentCreated(res, 'New Post Created');
}

module.exports = { createNewPost }