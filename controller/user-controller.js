const md5 = require('md5');

const { ResponseStructure } = require('../utilities/response-structure');
const { ApiError } = require('../utilities/api-error');
const { runQueryAsync } = require('../utilities/db');
const { signUser } = require('../utilities/sign-user');

const login = async(req, res, next) => {

    const user = req.body;
    const qry = "SELECT email, password FROM users WHERE email = ? ";
    const qryParams = [user.email, user.password];
    let dbResponse = await runQueryAsync(qry, qryParams);

    if (dbResponse.error) {
        // database error
        next(ApiError.internalError(dbResponse.error.message));
        return;
    } else if (dbResponse.result.length === 0) {
        next(ApiError.badRequest('User Not Found!'));
        return;
    }
    let plaintextPassword = user.password;
    let hashedPassword = dbResponse.result[0].password;
    // matching hashed password
    if (md5(plaintextPassword) !== hashedPassword) {
        next(ApiError.unAuthorized('Failed authentication'));
        return;
    } else {
        // failed authentication
        ResponseStructure.success(res, 'Logged in successfully', {
            token: await signUser(user.email)
        })
    }
}

module.exports = { login }