const Prato = require('../models/prato');

module.exports = {
  async index(req, res) {
    try {
      const pratos = await Prato.findAll();
      return res.json(pratos);
    } catch (error) {
      console.error("Erro ao listar pratos:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const prato = await Prato.findByPk(id);

      if (!prato) {
        return res.status(404).json({ error: "Prato não encontrado." });
      }

      return res.json(prato);
    } catch (error) {
      console.error("Erro ao buscar prato:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async store(req, res) {
    try {
      const { nome, descricao, preco } = req.body;

      const regexNome = /^[a-zA-ZÀ-ú\s]{3,50}$/;
      if (!regexNome.test(nome)) {
        return res.status(400).json({
          error: "Nome do prato inválido. Deve conter apenas letras e espaços, de 3 a 50 caracteres."
        });
      }

      const prato = await Prato.create({ nome, descricao, preco });

      return res.status(201).json(prato);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Já existe um prato com este nome.' });
      }
      console.error("Erro ao criar prato:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco } = req.body;

      const prato = await Prato.findByPk(id);

      if (!prato) {
        return res.status(404).json({ error: "Prato não encontrado." });
      }

      if (nome) {
        const regexNome = /^[a-zA-ZÀ-ú\s]{3,50}$/;
        if (!regexNome.test(nome)) {
          return res.status(400).json({
            error: "Nome do prato inválido. Deve conter apenas letras e espaços, de 3 a 50 caracteres."
          });
        }
      }

      await prato.update({ nome, descricao, preco });

      return res.json(prato);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ error: 'Já existe um prato com este nome.' });
      }
      console.error("Erro ao atualizar prato:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const prato = await Prato.findByPk(id);

      if (!prato) {
        return res.status(404).json({ error: "Prato não encontrado." });
      }

      await prato.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar prato:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
};
