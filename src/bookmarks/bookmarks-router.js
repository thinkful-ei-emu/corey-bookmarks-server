const express = require('express');
const logger = require('../logger');
const uuid = require('uuid/v4');
const { bookmarks } = require('../store');

const bookmarkRouter = express.Router();
const bodyParser = express.json();

//GET ALL BOOKMARKS ARRAY
bookmarkRouter
  .route('/bookmark')
  .get((req, res) => {
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {

    const { title, url, desc, rating } = req.body;
    if (!title) {
      logger.error('a title is required');
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!url) {
      logger.error('a URL is required');
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!desc) {
      logger.error('a description is required');
      return res
        .status(400)
        .send('Invalid data');
    }

    if (!rating) {
      logger.error('a rating is required');
      return res
        .status(400)
        .send('Invalid data');
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
  .get((req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    const bookmark = bookmarks.find(b => b.id == id);
    //Checking to make sure a bookmark is found
    if(!bookmark) {
      logger.error(`Bookmark with id ${id} not found`);
      return res
        .status(404)
        .send('Card not found');
    }
    res.json(bookmark);
  })
//DELETE BOOKMARK BY ID
  .delete((req, res) => {
    const { id } = req.params;
    // eslint-disable-next-line eqeqeq
    const bookmarkIndex = bookmarks.findIndex(b => b.id === id);
  
    if(bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found`);
      return res
        .status(400)
        .send('Not Found');
    }
    //remove bookmark from bookmarks
    bookmarks.splice(bookmarkIndex, 1);
    logger.info(`Bookmark with id ${id} deleted`);

    res  
      .status(204)
      .end();
  });

module.exports = bookmarkRouter;