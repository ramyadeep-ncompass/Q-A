const jwt = require('jsonwebtoken');
require('dotenv').config();

const { ApiError } = require('../utilities/api-error');

const privateKey = process.env.JWT_KEY;

module.exports.authenticateUserToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        next(ApiError.badRequest('Authorization token is not found!'));
        return;
    }

    jwt.verify(token, privateKey, (err, user) => {
        if (err) {
            next(ApiError.unAuthorized('You dont have the privilege.'));
        }
        req.user = { email: user.email };
        next();
    })
}