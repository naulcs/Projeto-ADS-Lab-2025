const { Router } = require('express');

// Importação dos controladores
const PratoController = require('../controllers/pratoController');
const ClienteController = require('../controllers/clienteController');
const pedidoController = require('../controllers/pedidoController');
const routes = Router();

//ROTAS DE PRATOS
//Rota para listar todos os pratos
routes.get('/pratos', PratoController.index);

//Rota para buscar um prato específico por ID
routes.get('/pratos/:id', PratoController.show);

//Rota para criar um novo prato
routes.post('/pratos', PratoController.store);

//Rota para atualizar um prato por ID
routes.put('/pratos/:id', PratoController.update);

//Rota para deletar um prato por ID
routes.delete('/pratos/:id', PratoController.delete);


//ROTAS DE CLIENTES
//Rota para listar todos os clientes
routes.get('/clientes', ClienteController.index);

//Rota para buscar um cliente específico por ID
routes.get('/clientes/:id', ClienteController.show);

//Rota para criar um novo cliente
routes.post('/clientes', ClienteController.store);

//Rota para atualizar um cliente por ID
routes.put('/clientes/:id', ClienteController.update);

//Rota para deletar um cliente por ID
routes.delete('/clientes/:id', ClienteController.delete);

// --- ROTAS DE PEDIDOS ---
// Rota para listar todos os pedidos
routes.get('/pedidos', pedidoController.index);
// Rota para criar um novo pedido
routes.post('/pedidos', pedidoController.store);

// --- ROTAS DE RELATÓRIOS ---
// Rota para o relatório de pratos mais populares
routes.get('/relatorios/pratos-populares', pedidoController.relatorioPratosPopulares);
// Rota para o relatório dos 5 clientes que mais fizeram pedidos
routes.get('/relatorios/clientes-mais-pedidos', pedidoController.relatorioClientesMaisPedidos);
// Rota para o relatório dos 5 clientes que mais gastaram
routes.get('/relatorios/clientes-maior-gasto', pedidoController.relatorioClientesMaiorGasto);
module.exports = routes;
