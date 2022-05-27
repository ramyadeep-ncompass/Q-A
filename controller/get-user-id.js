const getSignedUserId = async(email) => {
    let query = "SELECT user_id FROM users WHERE email = ?";
    let queryParams = [email];
    let dbResponse = await runQueryAsync(query, queryParams);
    if (dbResponse.error) {
        next(ApiError.internalError('Something went wrong!'));
    } else {
        console.log(dbResponse.result, signedUserEmail);
    }
    return dbResponse.result[0].user_id;
}

module.exports = { getSignedUserId };