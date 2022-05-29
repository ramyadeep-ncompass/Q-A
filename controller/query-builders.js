const { format } = require('fecha');

const buildQueryForCreatePost = () => {
    const query = `INSERT INTO posts (user_id,title,description,tags) VALUES ((SELECT user_id FROM users WHERE email = ?),?,?,?)`;
    return query;
}

const buildQueryForUpdatePosts = (fields) => {
    let query = 'UPDATE posts SET '
    let fieldsToUpdate = fields;

    delete fieldsToUpdate.post_id;

    let columnsToUpdate = '';
    let current_timestamp = format(new Date(), 'YYYY-MM-DD hh:mm:ss');


    for (const property in fieldsToUpdate)
        columnsToUpdate += `${property} = '${fieldsToUpdate[property]}', `;

    columnsToUpdate += ` created_at = '${current_timestamp}' `

    query += columnsToUpdate + 'WHERE user_id = (SELECT user_id FROM users WHERE email = ?) AND post_id = ?';
    return query;

}

const buildQueryForDeletePost = () => {
    let query = "DELETE FROM posts WHERE post_id = ? AND user_id = (SELECT user_id FROM users WHERE email = ?)";
    return query;
}


const buildDeleteQueryForLogin = () => {
    let query = "SELECT email, password FROM users WHERE email = ? ";
    return query;
}

const buildQueryForAnswerPost = () => {
    let current_timestamp = format(new Date(), 'YYYY-MM-DD hh:mm:ss');
    let query = `INSERT INTO answers (user_id,post_id,answer,created_at) VALUES ((SELECT user_id FROM users WHERE email = ?),?,?,'${current_timestamp}')`
    return query;
}

const buildQueryForGetQuestion = (filters) => {
    let pagination = '';
    let title = '';
    let tags = '';
    let filterActive = false;
    let filterParams = "";

    if (filters.page)
        pagination = ` LIMIT 10 OFFSET ${(filters.page - 1) * 10}`;

    if (filters.title) {
        if (filterActive) {
            title = ' AND title=?'
        } else {
            filterActive = true;
            title = "WHERE title=?"
        }
        filterParams += title
    }
    if (filters.tags)
        if (filterActive) {
            tags = " AND tags=?"
        } else {
            filterActive = true;
            tags = "WHERE tags=?"
        }
    filterParams += tags


    let query = `SELECT post_id,title,description,tags,name AS author,created_at FROM posts LEFT JOIN users ON posts.user_id = users.user_id ${filterParams} ${pagination}`;
    return query;
}

module.exports = {
    buildDeleteQueryForLogin,
    buildQueryForCreatePost,
    buildQueryForDeletePost,
    buildQueryForUpdatePosts,
    buildQueryForAnswerPost,
    buildQueryForGetQuestion
}