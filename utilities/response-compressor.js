var zlib = require('zlib');

const compressResponse = (data) => {
    return new Promise((resolve) => {
        let input = JSON.stringify(data);
        zlib.gzip(input, (err, result) => {
            return resolve(result);
        })
    })
}
module.exports = { compressResponse }