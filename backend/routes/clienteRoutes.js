const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const rotaController = require('../controllers/rotaController');

// Rotas existentes para clientes
router.get('/', clienteController.getClientes);
router.post('/', clienteController.addCliente);

// Rota para calcular a rota ótima
router.get('/calcularRota', rotaController.calcularRota);

module.exports = router;
