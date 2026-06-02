const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  usuario: { type: String, required: true },
  nota: { type: Number, required: true, min: 1, max: 5 },
  comentario: { type: String, required: true },
  criadoEm: { type: Date, default: Date.now }
});

const JogoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, unique: true },
  desenvolvedora: { type: String, required: true },
  anoLancamento: { type: Number, required: true },
  generos: [{ type: String }],
  plataformas: [{ type: String }],
  reviews: [ReviewSchema],
  mediaNotas: { type: Number, default: 0 }
});

module.exports = mongoose.model('Jogo', JogoSchema);