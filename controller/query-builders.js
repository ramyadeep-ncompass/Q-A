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

module.exports = { buildQueryForCreatePost, buildQueryForUpdatePosts, buildQueryForDeletePost }