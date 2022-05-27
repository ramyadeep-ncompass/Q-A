const express = require('express');
require('dotenv').config();

const { router } = require('./route/route');
const { errorHandler } = require('./utilities/error-handler');
const { successResponse } = require('./utilities/response-structure');
const { ApiError } = require('./utilities/api-error');


const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get('/', (req, res, next) => {
    successResponse(res, "Server is Active");
    // next(ApiError.internalError('Server is not responding'));
})

App.use('/api', router);

App.use(errorHandler)

const port = process.env.SERVER_PORT;

App.listen(port, () => {
    console.log(`Connected to localhost:${port}`);
});