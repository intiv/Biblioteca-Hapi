var booksController = require('./controllers/booksController');

exports.endpoints = [
	{
			method: 'POST',
		 	path: '/books',
		 	config: booksController.createBooks
 	},
	{
			method: 'GET',
		 	path: '/books',
		 	config: booksController.getBooks
 	},
	{
			method: 'GET',
			path: '/books/serchbyid/{id}',
			config: booksController.getBookId
 	},
	{
			method: 'GET',
			path: '/books/serchbyname/{titulo}',
			config: booksController.getBookName
 	},
	{
			method: 'GET',
			path: '/books/serchbygenre/{genero}',
			config: booksController.getBookGenre
 	},
	{
			method: 'GET',
			path: '/books/serchbyauthor/{autor}',
			config: booksController.getBookAuthor
 	},
	{
			method: 'GET',
			path: '/books/serchbykey/{keywords}',
			config: booksController.getBookKey
 	},
	{
			method: 'GET',
			path: '/books/borrowed/{prestado}',
			config: booksController.getBookPrestado
 	},
	{
			method: 'PUT',
			path: '/books/borrowbook/{prestado}',
			config: booksController.putBookPrestado
 	},
	{
			method: 'DELETE',
			path: '/books/delete/{id}',
			config: booksController.deleteBook
 	},
	{
			method: 'POST',
			path: '/books/create',
			config: booksController.createBook
 	}
];
