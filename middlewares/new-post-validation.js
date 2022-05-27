const Joi = require('joi');
const { ResponseStructure } = require('../utilities/response-structure');

const validateNewPostRequest = (req, res, next) => {

    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        tags: Joi.string()
    });
    const status = schema.validate(req.body);

    if (status.error) {

        let joiError = status.error.details[0].message.replace('\"', '').replace('\"', '');
        ResponseStructure.badRequestError(res, joiError);
        return;

    } else {
        next()
    }

}
module.exports = { validateNewPostRequest }