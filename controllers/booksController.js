var book = require('../schemas/book');
var mongoose = require('mongoose');

//Get all books
exports.getBooks = {
  handler: function(request, reply){
    var books = book.find({});
    reply(books);
  }
}

//Get one book by its id
exports.getBookId = {
  handler : function(request, reply){
    book.findOne({'_id' : request.params.id}, function(err, Book){
      if(!err && Book){
        return reply(Book);
      }else if(!err){
        return reply(boom.notFound());
      }else if(err){
        return reply(boom.wrap(err, 'Book not found'));
      }
    });
  }
}

//Create a new book
exports.createBook = {
  handler: function(request, reply){
    var newBook = new book({
      titulo : request.payload.titulo,
      genero : request.payload.genero,
      autor : request.payload.autor,
      publicacion : request.payload.publicacion,
      editorial : request.payload.editorial,
      descripcion : request.payload.descripcion,
      keywords : request.payload.keywords,
      copias_total : request.payload.copias_total,
      copias_disponible : request.payload.copias_disponible,
      prestado : 0
    });
    newBook.save();
    console.log('student saved');
    return reply('ok');
  }
}

//Delete a book given its id
exports.deleteBook = {
  handler: function(request, reply){
    book.findOne({'_id' : request.params.id}, function(err, Book){
      if(err){
        return reply(boom.badRequest("Could not delete book"));
      }else if(!err && Book){
        Book.remove();
        return reply('Book deleted succesfully');
      }else if(!err){
        return reply(boom.notFound());
      }
    });
  }
}
