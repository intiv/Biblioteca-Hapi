var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
  titulo : String,
  genero : String,
  autor : String,
  publicacion : Number,
  editorial : String,
  descripcion : String,
  keywords : [String],
  copias_total : Number,
  copias_disponible : Number
});

module.exports = mongoose.model('Student', StudentSchema);
