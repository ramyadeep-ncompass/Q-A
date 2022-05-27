const { compressResponse } = require('../utilities/response-compressor');

class ResponseStructure {

    static async success(res, message, data) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(await compressResponse({
            success: true,
            message: message,
            data: data
        }));
    }

    static async badRequestError(res, message, data) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(await compressResponse({
            success: false,
            message: message,
            data: data
        }))
    }

}

module.exports = { ResponseStructure }