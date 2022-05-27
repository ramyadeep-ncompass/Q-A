const express = require('express');
require('dotenv').config();

const { router } = require('./route/route');
const { errorHandler } = require('./utilities/error-handler');
const { ResponseStructure } = require('./utilities/response-structure');


const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get('/', (req, res, next) => {
    ResponseStructure.success(res, "Server is Active")
        // next(ApiError.internalError('Server is not responding'));
})

App.use('/api', router);

App.use(errorHandler)

const port = process.env.SERVER_PORT;

App.listen(port, () => {
    console.log(`Connected to localhost:${port}`);
});