class ApiError extends Error {
    constructor(message, errorCode) {
        super();
        this.message = message;
        this.errorCode = errorCode;
    }

    static internalError(message) {
        return new ApiError(message, 500);
    }
    static badRequest(message) {
        return new ApiError(message, 400);
    }
    static unAuthorized(message) {
        return new ApiError(message, 401);
    }
}

module.exports = { ApiError };