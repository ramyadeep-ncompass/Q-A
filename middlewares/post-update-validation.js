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

        let joiError = status.error.details[0].message.replace('\"', '').replace('\"', '');
        ResponseStructure.badRequestError(res, joiError);
        return;

    } else {
        next()
    }

}
module.exports = { validatePostUpdateRequest }