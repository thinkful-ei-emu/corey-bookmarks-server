const bookmarkService = {
  getAllBookmarks(knexInstance) {
    return knexInstance.select('*').from('bookmarks');
  },
  getById(knexInstance, id) {
    return knexInstance.from('bookmarks').select('*').where('id', id).first();
  },
  insertBookmark(knexInstance, newBookmark) {
    return knexInstance
      .insert(newBookmark)
      .into('bookmarks')
      .returning('*')
      .then(rows => {
        return rows[0];
      });
  },
  deleteBookmark(knexInstance, id) {
    return knexInstance('bookmarks')
      .where({ id })
      .delete();
  },
  updateBookmark(knexInstance, id, newBookmarkFields) {
    return knexInstance('bookmarks')
      .where({ id })
      .update(newBookmarkFields);
  },
};

module.exports = bookmarkService;