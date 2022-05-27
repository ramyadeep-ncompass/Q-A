const { object } = require("joi");

const buildUpdateQueryForPosts = (fields) => {
    let query = 'UPDATE posts SET '
    let fieldsToUpdate = fields;

    delete fieldsToUpdate.post_id;

    let columnsToUpdate = '';
    let current_timestamp = Date().toLocaleString();

    for (const property in fieldsToUpdate)
        columnsToUpdate += `${property} = '${fieldsToUpdate[property]}', `;

    columnsToUpdate += ` created_at = '${current_timestamp}' `

    query += columnsToUpdate + 'WHERE user_id = ? AND post_id = ?';
    return query;

}

const buildDeleteQueryForPost = () => {
    let query = "DELETE FROM posts WHERE post_id = ? AND user_id = ?";
    return query;
}

module.exports = { buildUpdateQueryForPosts, buildDeleteQueryForPost }