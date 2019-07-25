const bookmarkService = {
  getAllBookmarks(knexInstanceHotdog) {
    return knexInstanceHotdog.select('*').from('bookmarks');
  }

};

module.exports = bookmarkService;