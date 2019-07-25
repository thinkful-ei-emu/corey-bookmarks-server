function makeBookmarksArray() {
  return [
    {
      id: 1,
      title: 'First test post!',
      url: 'www.books.com',
      description: 'here is a dummy description of my book',
      rating: '1'
    },
    {
      id: 2,
      title: 'Second test post!',
      url: 'www.books.com',
      description: 'here is a dummy description of my book',
      rating: '5'
    },
    {
      id: 3,
      title: 'Third test post!',
      url: 'www.books.com',
      description: 'here is a dummy description of my book',
      rating: '4'
    },
    {
      id: 4,
      title: 'Fourth test post!',
      url: 'www.books.com',     
      description: 'here is a dummy description of my book',
      rating: '2'
    },
  ];
}

module.exports = {
  makeBookmarksArray,
};