const { Contato } = require('../database/models');

const listar = async () => await Contato.findAll();
const buscarPorId = async (id) => await Contato.findByPk(id);
const criar = async (dados) => await Contato.create(dados);
const atualizar = async (id, dados) => {
    await Contato.update(dados, { where: { id } });
    return await Contato.findByPk(id);
};
const remover = async (id) => await Contato.destroy({ where: { id } });

module.exports = { listar, buscarPorId, criar, atualizar, remover };