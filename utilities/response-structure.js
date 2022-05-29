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

    static async contentCreated(res, message, data) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/json');
        res.status(201);
        res.send(await compressResponse({
            success: true,
            message: message,
            data: data
        }));
    }

    static async accepted(res, message, data) {
        res.setHeader('Content-Encoding', 'gzip');
        res.setHeader('Content-Type', 'application/json');
        res.status(202);
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

async function successResponse(res, message, statusCode, data, ) {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode ? statusCode : 200);
    res.send(await compressResponse({
        success: true,
        message,
        data
    }));
}

async function errorResponse(res, message, statusCode, data) {
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    res.status(statusCode ? statusCode : 500);
    res.send(await compressResponse({
        success: false,
        message,
        data
    }));
}


module.exports = { ResponseStructure, successResponse, errorResponse }