const express = require('express');
const usuariosController = require(
 '../controllers/usuarios.controller'
);
const { authorizeRoles } = require("../middlewares/authorizeRoles.middleware");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");

const router = express.Router();

router.get('/', usuariosController.listarUsuarios); // Pública
router.get('/:id', usuariosController.buscarUsuarioPorId); // Pública
router.post('/', authenticateToken, authorizeRoles("user","admin"), usuariosController.criarUsuario); // Precisará estar logado
router.put('/:id', authenticateToken, authorizeRoles("user","admin"), usuariosController.atualizarUsuario); // Precisará estar logado
router.delete('/:id', authenticateToken, authorizeRoles("admin"), usuariosController.excluirUsuario); // Usuário precisará ser admin

module.exports = router;