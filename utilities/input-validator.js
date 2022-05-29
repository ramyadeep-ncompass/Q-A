const Joi = require('joi');
const { ApiError } = require('./api-error');

const validateUserInput = (schema, data, next) => {
    const status = schema.validate(data);

    if (status.error) {
        let joiError = status.error.details[0].message.replace('\"', '').replace('\"', '');
        return joiError;
    } else {
        return true;
    }
}

module.exports = { validateUserInput }