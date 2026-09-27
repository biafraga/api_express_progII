const repository = require('../repositories/contatos.repository');

const list = async () => await repository.listar();
const get = async (id) => await repository.buscarPorId(id);
const create = async (dados) => await repository.criar(dados);
const update = async (id, dados) => await repository.atualizar(id, dados);
const remove = async (id) => await repository.remover(id);

module.exports = { list, get, create, update, remove };