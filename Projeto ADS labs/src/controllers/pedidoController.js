const { Op } = require('sequelize');
const Pedido = require('../models/pedido');
const Cliente = require('../models/cliente');
const Prato = require('../models/prato');
const { sequelize } = require('../models/prato');

module.exports = {
  async index(req, res) {
    try {
      const pedidos = await Pedido.findAll({
        include: [
          { model: Cliente, as: 'cliente' },
          { model: Prato, as: 'pratos', through: { attributes: [] } }
        ]
      });
      return res.json(pedidos);
    } catch (error) {
      console.error("Erro ao listar pedidos:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async store(req, res) {
    const t = await sequelize.transaction();
    try {
      const { cliente_id, prato_ids } = req.body;

      const cliente = await Cliente.findByPk(cliente_id);
      if (!cliente) {
        await t.rollback();
        return res.status(404).json({ error: 'Cliente não encontrado.' });
      }

      if (!prato_ids || prato_ids.length === 0) {
        await t.rollback();
        return res.status(400).json({ error: 'É necessário fornecer ao menos um prato.' });
      }
      const pratosDb = await Prato.findAll({ where: { id: { [Op.in]: prato_ids } } });
      if (pratosDb.length !== prato_ids.length) {
        await t.rollback();
        return res.status(404).json({ error: 'Um ou mais pratos não foram encontrados.' });
      }

      const valorTotal = pratosDb.reduce((total, prato) => total + prato.preco, 0);

      const pedido = await Pedido.create({
        cliente_id,
        valor_total: valorTotal,
      }, { transaction: t });

      await pedido.addPratos(pratosDb, { transaction: t });

      await t.commit();

      const pedidoCompleto = await Pedido.findByPk(pedido.id, {
        include: [
          { model: Cliente, as: 'cliente' },
          { model: Prato, as: 'pratos', through: { attributes: [] } }
        ]
      });

      return res.status(201).json(pedidoCompleto);
    } catch (error) {
      await t.rollback();
      console.error("Erro ao criar pedido:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async relatorioPratosPopulares(req, res) {
    try {
      const pratos = await Prato.findAll({
        attributes: [
          'id', 'nome', 'descricao', 'preco',
          [sequelize.fn('COUNT', sequelize.col('pedidos.id')), 'quantidade_pedidos']
        ],
        include: [{
          model: Pedido,
          as: 'pedidos',
          attributes: [],
          through: { attributes: [] }
        }],
        group: ['Prato.id'],
        order: [[sequelize.col('quantidade_pedidos'), 'DESC']]
      });

      return res.json(pratos);
    } catch (error) {
      console.error("Erro no relatório de pratos populares:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
  
  async relatorioClientesMaisPedidos(req, res) {
    try {
      const clientes = await Cliente.findAll({
        attributes: [
          'nome',
          [sequelize.fn('COUNT', sequelize.col('pedidos.id')), 'total_pedidos']
        ],
        include: [{
          model: Pedido,
          as: 'pedidos',
          attributes: [],
        }],
        group: ['Cliente.id', 'Cliente.nome'],
        order: [[sequelize.col('total_pedidos'), 'DESC']],
        limit: 5,
        subQuery: false
      });
      return res.json(clientes);
    } catch (error) {
        console.error("Erro no relatório de clientes (pedidos):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async relatorioClientesMaiorGasto(req, res) {
    try {
        const clientes = await Cliente.findAll({
            attributes: [
                'nome',
                [sequelize.fn('SUM', sequelize.col('pedidos.valor_total')), 'total_gasto']
            ],
            include: [{
                model: Pedido,
                as: 'pedidos',
                attributes: [],
            }],
            group: ['Cliente.id', 'Cliente.nome'],
            order: [[sequelize.col('total_gasto'), 'DESC']],
            limit: 5,
            subQuery: false
        });
        return res.json(clientes);
    } catch (error) {
        console.error("Erro no relatório de clientes (gasto):", error);
        return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },
};
