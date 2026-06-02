const Jogo = require('../models/Jogo');

// Cadastrar novo jogo
exports.criarJogo = async (req, res) => {
  try {
    const novoJogo = new Jogo(req.body);
    await novoJogo.save();
    res.status(201).json(novoJogo);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

// Listar todos os jogos (com filtro opcional)
exports.listarJogos = async (req, res) => {
  try {
    const { genero } = req.query;
    let busca = {};
    if (genero) busca.generos = genero;

    const jogos = await Jogo.find(busca);
    res.json(jogos);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// Adicionar uma review e recalcular a média
exports.adicionarReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, nota, comentario } = req.body;

    const jogo = await Jogo.findById(id);
    if (!jogo) return res.status(404).json({ mensagem: 'Jogo não encontrado' });

    jogo.reviews.push({ usuario, nota, comentario });

    // Cálculo da média
    const totalNotas = jogo.reviews.reduce((acc, review) => acc + review.nota, 0);
    jogo.mediaNotas = (totalNotas / jogo.reviews.length).toFixed(1);

    await jogo.save();
    res.status(201).json({ mensagem: 'Review adicionada!', jogo });
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};