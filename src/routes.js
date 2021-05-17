const handler= require('./handler');

const access = {
  cors: {
    origin: ['*'],
  },
};

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: handler.post.saveBookHandler,
    options: access,
  },
  {
    method: 'GET',
    path: '/books/{bookId?}',
    handler: handler.get.getBooksHandler,
    options: access,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.put.editBookHandler,
    options: access,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.del.deleteBookHandler,
    options: access,
  },
];
module.exports = routes;
