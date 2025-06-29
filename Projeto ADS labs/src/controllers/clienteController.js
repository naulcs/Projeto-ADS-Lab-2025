const Cliente = require('../models/cliente');

function limparCPF(cpf) {
  if (typeof cpf !== 'string') return '';
  return cpf.replace(/[^\d]+/g, '');
}

function validarCPF(cpf) {
  const cpfLimpo = limparCPF(cpf);

  if (cpfLimpo.length !== 11 || /^(\d)\1{10}$/.test(cpfLimpo)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.charAt(10))) return false;

  return true;
}

module.exports = {
  async index(req, res) {
    try {
      const clientes = await Cliente.findAll();
      return res.json(clientes);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      return res.json(cliente);
    } catch (error) {
      console.error("Erro ao buscar cliente:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async store(req, res) {
    try {
      const { nome, cpf: cpfRecebido } = req.body;

      if (!validarCPF(cpfRecebido)) {
        return res.status(400).json({ error: "CPF inválido." });
      }
      
      const cpfFormatado = limparCPF(cpfRecebido);

      const clienteExistente = await Cliente.findOne({ where: { cpf: cpfFormatado } });
      if (clienteExistente) {
        return res.status(400).json({ error: "CPF já cadastrado." });
      }

      const cliente = await Cliente.create({ nome, cpf: cpfFormatado });

      return res.status(201).json(cliente);
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, cpf: cpfRecebido } = req.body;

      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      let cpfFormatado;
      if (cpfRecebido) {
        if (!validarCPF(cpfRecebido)) {
          return res.status(400).json({ error: "CPF inválido." });
        }

        cpfFormatado = limparCPF(cpfRecebido);

        if (cpfFormatado !== cliente.cpf) {
          const clienteExistente = await Cliente.findOne({ where: { cpf: cpfFormatado } });
          if (clienteExistente) {
            return res.status(400).json({ error: "CPF já cadastrado para outro cliente." });
          }
        }
      }

      await cliente.update({ 
        nome: nome || cliente.nome, 
        cpf: cpfFormatado || cliente.cpf 
      });

      return res.json(cliente);
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);

      if (!cliente) {
        return res.status(404).json({ error: "Cliente não encontrado." });
      }

      await cliente.destroy();

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
};
