const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/jogoController');

// Rotas para /api/jogos
router.post('/', jogoController.criarJogo);
router.get('/', jogoController.listarJogos);

// Rota para reviews
router.post('/:id/reviews', jogoController.adicionarReview);

module.exports = router;