require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const validateBearerToken = require('./validate-bearer-token');
const bookmarkRouter = require('./bookmarks/bookmarks-router');
const errorHandler = require('./error-handler');

const app = express();

app.use(express.json());

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(cors());
app.use(helmet());
app.use(validateBearerToken);
app.use(morgan(morganOption));

app.use(bookmarkRouter);

app.use(errorHandler);

module.exports = app;