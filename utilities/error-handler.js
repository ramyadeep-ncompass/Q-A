const { ApiError } = require('../utilities/api-error');
const { errorResponse } = require('../utilities/response-structure');
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        // res.status(err.errorCode);
        // res.send({
        //     success: false,
        //     message: err.message
        // });
        errorResponse(res, err.message, err.errorCode)

    } else {
        // res.status(500).send({
        //     success: false,
        //     message: err.message ? err.message : "Something Broke"
        // });
        errorResponse(res, err.message ? err.message : "Something Broke", 500)
    }
    return;
}
module.exports = { errorHandler }