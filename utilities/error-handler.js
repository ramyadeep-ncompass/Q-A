const { ApiError } = require('../utilities/api-error');
const { errorResponse } = require('../utilities/response-structure');
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError)
        errorResponse(res, err.message, err.errorCode)

    else
        errorResponse(res, err.message ? err.message : "Something Broke", 500)

    return;
}
module.exports = { errorHandler }