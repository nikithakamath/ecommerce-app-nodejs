'use strict';

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');

const port = process.env.PORT;

app.use(helmet());
app.use(bodyParser.json());
app.use(require('./routes'));

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});