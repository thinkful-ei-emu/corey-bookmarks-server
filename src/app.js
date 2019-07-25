require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const logger = require('./logger');
const bookmarkRouter = require('./bookmarks/bookmarks-router');
const bookmarkService = require('./bookmark-service');

// const bookmarksRouter = require('./bookmarks/bookmarks-router');

const app = express();
app.use(express.json());



//API token validation 
app.use(function validateBearerToken(req, res, next) {
  //console.log(req.app.get('potatoe'));//this comes from app.set
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');//this comes from the header of the request

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    //via winston: an invalid token will display this message and added that log to info.log
    logger.error(`Unauthorized request to path: ${req.path}`);
    return res.status(401).json({ error: 'Unauthorized request' });
  }
  next();
});


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use('/bookmark', bookmarkRouter);

// app.get('/bookmark', (req, res, next) => { //get endpoint
//   const knexInstance = req.app.get('bookmarksDb');
//   bookmarkService.getAllBookmarks(knexInstance)
//     .then(bookmarks => {
//       if (!bookmarks) {
//         return res.status(404).json({
//           error: { message: 'Bookmark\'s not found' }
//         });
//       }
//       res.json({
//         // id: bookmark.id,
//         // title: bookmark.title,
//         // url: bookmark.url,
//         // description: bookmark.description,
//         // rating: bookmark.rating
//       });
//     })
//     .catch(next);
// });

app.get('/bookmark/:bookmark_id', (req, res, next) => {
  const knexInstance = req.app.get('bookmarksDb');
  bookmarkService.getById(knexInstance, req.params.article_id)
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).json({
          error: { message: 'Cannot find this bookmark' }
        });
      }
      res.json();
    })
    .catch(next);
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error};
  }
  res.status(500).json(response);
});

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(bookmarkRouter);

module.exports = app;