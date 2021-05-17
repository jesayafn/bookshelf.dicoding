const {nanoid} = require('nanoid');

const saveBookHandler = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const failMessage1 = 'Gagal menambahkan buku. '+
  'Mohon isi nama buku';
  const failMessage2 = 'Gagal menambahkan buku. '+
  'readPage tidak boleh lebih besar dari pageCount';
  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: failMessage1,
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: failMessage2,
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage) ? true : false;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };
  const dbBooks = request.mongo.db.collection('booksCollection');
  await dbBooks.insertOne(newBook);
  const checking = await dbBooks.find({'id': id}).count() === 1;
  if (checking == true) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getBooksHandler = async (request, h) => {
  const {reading} = request.query;
  const {bookId} = request.params;
  const noData = [{
    'id': 'no data',
    'name': 'no data',
    'publisher': 'no data',
  }];

  const checking = await dbBooks.find({}).count() >= 1;
  if (bookId !== undefined && reading === undefined && checking == true) {
    const book = await dbBooks.find({'id': `${bookId}`}, {
      projection: {
        _id: 0,
      },
    }).toArray();
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  };
  if (reading !== undefined &&
    reading == 'yes' &&
    bookId === undefined &&
    checking === true) {
    const books = await dbBooks.find({'reading': true}, {
      projection: {
        _id: 0,
        id: 1,
        name: 1,
        publisher: 1,
      },
    }).toArray();
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  };
  if (bookId === undefined &&
    reading === undefined &&
    checking === true) {
    const books = await dbBooks.find({}, {
      projection: {
        _id: 0,
        id: 1,
        name: 1,
        publisher: 1,
      }}).toArray();
    const response = h.response({
      status: 'success',
      data: {
        books,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: noData,
    },
  });
  response.code(200);
  return response;
};

const editBookHandler = async (request, h) => {
  const {bookId} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const failMessage1 = 'Gagal memperbarui buku. '+
  'Mohon isi nama buku';
  const failMessage2 = 'Gagal memperbarui buku. '+
  'readPage tidak boleh lebih besar dari pageCount';
  if (name === null) {
    const response = h.response({
      status: 'fail',
      message: failMessage1,
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: failMessage2,
    });
    response.code(400);
    return response;
  }
  const updateBook = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const dbBooks = request.mongo.db.collection('booksCollection');
  const checking = await dbBooks.find({'id': bookId}).count() == 1;

  if (checking === true) {
    await dbBooks.updateOne({'id': bookId}, {$set: updateBook});
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookHandler = async (request, h) => {
  const {bookId} = request.params;
  const dbBooks = request.mongo.db.collection('booksCollection');
  const checking = await dbBooks.find({'id': bookId}).count() == 1;
  if (checking === true) {
    await dbBooks.deleteOne({'id': bookId});
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const get = {getBooksHandler};
const post = {saveBookHandler};
const put = {editBookHandler};
const del = {deleteBookHandler};
module.exports = {get, post, put, del};
