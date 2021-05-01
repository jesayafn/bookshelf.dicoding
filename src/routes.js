const handler= require('./handler');

const access = {
  cors: {
    origin: ['*'],
  },
};

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: handler.post.addNoteHandler,
    options: access,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: handler.get.getAllNotesHandler,
    options: access,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: handler.get.getNoteByIdHandler,
    options: access,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: handler.put.editNoteByIdHandler,
    options: access,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: handler.del.deleteNoteByIdHandler,
    options: access,
  },
];
module.exports = routes;
