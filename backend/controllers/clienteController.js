const db = require('../config/db');

// Função para obter a lista de clientes
const getClientes = async (req, res) => {
  try {
    // Consulta o banco de dados para obter todos os clientes
    const { rows } = await db.query('SELECT * FROM clientes');
    res.json(rows); // Retorna a lista de clientes em formato JSON
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao buscar clientes" }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

// Função para adicionar um novo cliente
const addCliente = async (req, res) => {
  // Extrai os dados do cliente do corpo da requisição
  const { nome, email, telefone, coordenada_x, coordenada_y } = req.body;
  try {
    // Insere um novo cliente no banco de dados e retorna os dados do cliente inserido
    const { rows } = await db.query('INSERT INTO clientes (nome, email, telefone, coordenada_x, coordenada_y) VALUES ($1, $2, $3, $4, $5) RETURNING *', [nome, email, telefone, coordenada_x, coordenada_y]);
    res.status(201).json(rows[0]); // Retorna os dados do cliente inserido com status 201 (Criado)
  } catch (error) {
    res.status(500).json({ mensagem: "Erro ao adicionar cliente" }); // Em caso de erro, retorna uma mensagem de erro com status 500
  }
};

module.exports = { getClientes, addCliente };
