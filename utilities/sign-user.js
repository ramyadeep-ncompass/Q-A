const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUser = (email) => {
    return new Promise((resolve) => {
        jwt.sign({ email: email }, process.env.JWT_KEY, { expiresIn: '30m' }, (err, token) => {
            resolve(token);
        });
    })
}




module.exports = { signUser }