const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUser = (data) => {
    return new Promise((resolve) => {
        jwt.sign({ data }, process.env.JWT_KEY, { expiresIn: '30m' }, (err, token) => {
            resolve(token);
        });
    })
}




module.exports = { signUser }