const Joi = require('joi');
const { ResponseStructure } = require('../utilities/response-structure');

const validatePostUpdateRequest = (req, res, next) => {

    const schema = Joi.object({
        post_id: Joi.number().required(),
        title: Joi.string(),
        description: Joi.string(),
        tags: Joi.string()
    });

    const status = schema.validate(req.body);
    if (status.error) {

        const joiError = status.error.details[0].message.replace('\"', '').replace('\"', '');
        ResponseStructure.badRequestError(res, joiError);
        return;

    }

    if (Object.keys(req.body).length < 2) {
        ResponseStructure.badRequestError(res, 'Minimum 1 field to update is required');
        return;
    }
    next()


}
module.exports = { validatePostUpdateRequest }