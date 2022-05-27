const Joi = require('joi');
const { ResponseStructure } = require('../utilities/response-structure');

const validateLogin = (req, res, next) => {

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
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
module.exports = { validateLogin }