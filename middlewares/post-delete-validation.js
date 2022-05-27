const { ApiError } = require('../utilities/api-error');
const validatePostDeleteRequest = (req, res, next) => {
    if (!req.body.post_id) {
        next(ApiError.badRequest('post_id is a required field'));
        return;
    }
    next();
}
module.exports = { validatePostDeleteRequest }