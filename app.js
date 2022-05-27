const express = require('express');
require('dotenv').config();


const App = express();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

App.get('/', (req, res, next) => {
    ResponseStructure.success(res, "Server is Active")
        // next(ApiError.internalError('Server is not responding'));
})

// App.use('/api', router);


const port = process.env.SERVER_PORT;

App.listen(port, () => {
    console.log(`Connected to localhost:${port}`);
});