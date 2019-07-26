const express = require('express');
const logger = require('../logger');
const uuid = require('uuid/v4');
// const { isWebUri } = require('vaild-url');
const { bookmarks } = require('../store');
const bookmarkService = require('./bookmark-service');
//connect to bookmark route knexInstance intead of bookmarks store
//then connecnt bookmark service
const bookmarkRouter = express.Router();
const bodyParser = express.json();

const serializeBookmark = bookmark => ({
  id: bookmark.id,
  title: bookmark.title,
  url: bookmark.url,
  description: bookmark.description,
  rating: Number(bookmark.rating)
});

//GET ALL BOOKMARKS ARRAY
bookmarkRouter
  .route('/bookmark')
  .get((req, res, next) => {
    bookmarkService.getAllBookmarks(req.app.get('db'))
      .then(bookmarks => {
        res.json(bookmarks.map(serializeBookmark));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res) => {
    //update to use db
    for (const field of ['title', 'url', 'rating']) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`'${field}' is required`);
      }
    }
    const { title, url, desc, rating } = req.body;

    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`);
      return res.status(400).send(`'rating' must be a number between 0 and 5`);
    }

    // if (!isWebUri(url)) {
    //   logger.error(`Invalid url '${url}' supplied`);
    //   return res.status(400).send(`'url' must be a valid URL`);
    // }

    if (!title) {
      logger.error('a title is required');
      return res
        .status(400)
        .send('Invalid title');
    }

    if (!desc) {
      logger.error('a description is required');
      return res
        .status(400)
        .send('Invalid description');
    }

    const id = uuid();
    const newBookmark = {
      id,
      title,
      url,
      desc,
      rating
    };

    bookmarks.push(newBookmark);

    logger.info(`Bookmark with id ${id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmark/${id}`)
      .json(newBookmark);
  });

//GET BOOKMARK BY ID
bookmarkRouter
  .route('/bookmark/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    bookmarkService.getById(req.app.get('db'), id)
      .then(bookmark => {
        if(!bookmark) {
          logger.error(`Bookmark with id ${id} not found`);
          return res.status(404).json({
            error: { message: 'Bookmark not found' }
          });
        }
        res.json(serializeBookmark(bookmark));
        next();
      })
      .catch(next);
  })

//DELETE BOOKMARK BY ID
  .delete((req, res, next) => {
    //TODO - update to use db
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    bookmarkService.deleteBookmark(req.app.get('db'),id)
    // if(bookmarkIndex === -1) {
    //   logger.error(`Bookmark with id ${id} not found`);
    //   return res
    //     .status(400)
    //     .send('Not Found');
    // }
      .then(numRowsAffected => {
        logger.info(`Bookmark with id ${id} deleted.`);
        res.status(204)
          .end();
      })
      .catch(next);
  });

module.exports = bookmarkRouter;