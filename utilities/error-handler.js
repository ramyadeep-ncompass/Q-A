const { ApiError } = require('../utilities/api-error');
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.errorCode);
        res.send({
            success: false,
            message: err.message
        })
    } else {
        res.status(500).send({
            success: false,
            message: err.message ? err.message : "Something Broke"
        });
    }
    return;
}
module.exports = { errorHandler }