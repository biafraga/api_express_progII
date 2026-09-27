const { Endereco } = require('../database/models');

const listar = async () => await Endereco.findAll();
const buscarPorId = async (id) => await Endereco.findByPk(id);
const criar = async (dados) => await Endereco.create(dados);
const atualizar = async (id, dados) => {
    await Endereco.update(dados, { where: { id } });
    return await Endereco.findByPk(id);
};
const remover = async (id) => await Endereco.destroy({ where: { id } });

module.exports = { listar, buscarPorId, criar, atualizar, remover };