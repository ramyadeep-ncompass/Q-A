const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const newPostSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.string()
});

const updatePostSchema = Joi.object({
    post_id: Joi.number().required(),
    title: Joi.string(),
    description: Joi.string(),
    tags: Joi.string()
});

const deletePostSchema = Joi.object({
    post_id: Joi.number().required()
})

const answerPostSchema = Joi.object({
    post_id: Joi.number().required(),
    answer: Joi.string().required()
})

module.exports = { userSchema, newPostSchema, updatePostSchema, deletePostSchema, answerPostSchema }