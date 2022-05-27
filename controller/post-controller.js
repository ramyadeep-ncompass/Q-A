const { ResponseStructure } = require('../utilities/response-structure');
const { ApiError } = require('../utilities/api-error');
const { runQueryAsync } = require('../utilities/db');

const createNewPost = async(req, res, next) => {
    const signedUserEmail = req.user.email;
    // console.log(signedUserEmail);
    const newPost = {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
    }

    const getUserId = async(email) => {
        let query = "SELECT user_id FROM users WHERE email = ?";
        let queryParams = [email];
        let dbResponse = await runQueryAsync(query, queryParams);
        if (dbResponse.error) {
            next(ApiError.internalError('Something went wrong!'));
        } else {
            console.log(dbResponse.result, signedUserEmail);
        }
        return dbResponse.result[0].user_id;
    }

    let query = `INSERT INTO posts (user_id,title,description,tags) VALUES (?,?,?,?)`;
    let userId = await getUserId(signedUserEmail);
    let queryParams = [userId, newPost.title, newPost.description, newPost.tags]

    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error));
        return;
    }

    ResponseStructure.contentCreated(res, 'New Post Created');


}

module.exports = { createNewPost }