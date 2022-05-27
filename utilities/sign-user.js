const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUserWithJWT = (email) => {
    return new Promise((resolve) => {
        jwt.sign({ email: email }, process.env.JWT_KEY, { expiresIn: '30m' }, (err, token) => {
            resolve(token);
        });
    })
}




module.exports = { signUserWithJWT }