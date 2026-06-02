const express = require('express');
const conectarBanco = require('./config/db');
const jogoRoutes = require('./routes/jogoRoutes');
require('dotenv').config();

const app = express();

// Conectar ao Banco de Dados
conectarBanco();

// Middlewares
app.use(express.json());

// Rotas da API
app.use('/api/jogos', jogoRoutes);

// Rota raiz de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API GameReview rodando com sucesso!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));