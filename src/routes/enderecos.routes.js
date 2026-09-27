const express = require("express");
const controller = require("../controllers/enderecos.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");
const { authorizeRoles } = require("../middlewares/authorizeRoles.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/v1/enderecos:
 *   get:
 *     summary: Lista todos os endereços
 *     tags: [Endereços]
 *     responses:
 *       200:
 *         description: Lista de endereços retornada com sucesso
 */
router.get("/", controller.list);

/**
 * @swagger
 * /api/v1/enderecos/{id}:
 *   get:
 *     summary: Busca um endereço por ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do endereço
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *       404:
 *         description: Endereço não encontrado
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /api/v1/enderecos:
 *   post:
 *     summary: Cadastra um novo endereço
 *     tags: [Endereços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               cep:
 *                 type: string
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *               bairro:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 */
router.post("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.create);

/**
 * @swagger
 * /api/v1/enderecos/{id}:
 *   put:
 *     summary: Atualiza um endereço existente
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rua:
 *                 type: string
 *               numero:
 *                 type: string
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *       404:
 *         description: Endereço não encontrado
 */
router.put("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.update);

/**
 * @swagger
 * /api/v1/enderecos/{id}:
 *   delete:
 *     summary: Remove um endereço
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Endereço removido com sucesso
 *       404:
 *         description: Endereço não encontrado
 */
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), controller.remove);

module.exports = router;