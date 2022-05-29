const { ResponseStructure, successResponse } = require('../utilities/response-structure');
const { ApiError } = require('../utilities/api-error');
const { runQueryAsync } = require('../utilities/db');
const {
    buildQueryForCreatePost,
    buildQueryForDeletePost,
    buildQueryForUpdatePosts,
    buildQueryForAnswerPost,
    buildQueryForGetQuestion,
} = require('./query-builders');
const {
    newPostSchema,
    deletePostSchema,
    updatePostSchema,
    answerPostSchema,
    getQuestionsSchema
} = require('../utilities/validation-schemas');
const { validateUserInput } = require('../utilities/input-validator');

const createNewPost = async(req, res, next) => {

    let joiError = validateUserInput(newPostSchema, req.body);
    if (joiError !== true) {
        next(ApiError.badRequest(joiError));
        return;
    }

    const signedUserEmail = req.user.email;
    // console.log(signedUserEmail);
    const newPost = {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags
    }

    let query = buildQueryForCreatePost();
    let queryParams = [signedUserEmail, newPost.title, newPost.description, newPost.tags]
    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error));
        return;
    }

    ResponseStructure.contentCreated(res, 'New Post Created');
}

const updatePost = async(req, res, next) => {

    const joiError = validateUserInput(updatePostSchema, req.body);
    if (joiError !== true) {
        next(ApiError.badRequest(joiError));
        return;
    }

    if (Object.keys(req.body).length < 2) {
        next(ApiError.badRequest('Minimum 1 field to update is required'));
        return;
    }

    const signedUserEmail = req.user.email;
    const post_id = req.body.post_id;

    let query = buildQueryForUpdatePosts(req.body);
    let queryParams = [signedUserEmail, post_id];

    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error));
        return;
    }

    if (dbResponse.result.changedRows === 0) {
        next(ApiError.unAuthorized('You cannot update other\'s posts'));
        return;
    }

    ResponseStructure.accepted(res, 'Your post was updated!')
}

const deletePost = async(req, res, next) => {

    const joiError = validateUserInput(deletePostSchema, req.body);
    if (joiError !== true) {
        next(ApiError.badRequest(joiError));
        return;
    }

    const signedUserEmail = req.user.email;
    const query = buildQueryForDeletePost();

    const post_id = req.body.post_id;
    let queryParams = [post_id, signedUserEmail];

    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error));
        return;
    }

    if (dbResponse.result.affectedRows === 0) {
        next(ApiError.unAuthorized('You cannot delete other\'s posts'));
        return;
    }

    ResponseStructure.success(res, 'Post was deleted!');
}

const answerPost = async(req, res, next) => {
    const joiError = validateUserInput(answerPostSchema, req.body);
    if (joiError !== true) {
        next(ApiError.badRequest(joiError));
        return;
    }

    const answer = req.body;
    const signedUserEmail = req.user.email;
    const query = buildQueryForAnswerPost();
    const queryParams = [signedUserEmail, answer.post_id, answer.answer]

    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error.message));
        return;
    }

    if (dbResponse.result.affectedRows === 0) {
        next(ApiError.unAuthorized('This post does not exist'));
        return;
    }

    successResponse(res, "You answer has been saved");
}

const getQuestions = async(req, res, next) => {
    const joiError = validateUserInput(getQuestionsSchema, req.query);
    if (joiError !== true) {
        next(ApiError.badRequest(joiError));
        return;
    }

    const filters = req.query;
    let query = buildQueryForGetQuestion(filters);

    delete filters.page;
    let queryParams = Object.keys(filters)
        .map(function(key) {
            return `%${filters[key]}%`;
        });;

    let dbResponse = await runQueryAsync(query, queryParams);

    if (dbResponse.error) {
        next(ApiError.internalError(dbResponse.error.message));
        return;
    }

    successResponse(res, `${dbResponse.result.length} questions found for your search`, 200, dbResponse.result);
}

module.exports = {
    createNewPost,
    updatePost,
    deletePost,
    answerPost,
    getQuestions
}