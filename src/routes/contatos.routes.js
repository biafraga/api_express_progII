const express = require("express");
const controller = require("../controllers/contatos.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");
const { authorizeRoles } = require("../middlewares/authorizeRoles.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/v1/contatos:
 *   get:
 *     summary: Lista todos os contatos
 *     tags: [Contatos]
 *     responses:
 *       200:
 *         description: Lista de contatos retornada com sucesso
 */
router.get("/", controller.list);

/**
 * @swagger
 * /api/v1/contatos/{id}:
 *   get:
 *     summary: Busca um contato por ID
 *     tags: [Contatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do contato
 *     responses:
 *       200:
 *         description: Contato encontrado
 *       404:
 *         description: Contato não encontrado
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /api/v1/contatos:
 *   post:
 *     summary: Cadastra um novo contato
 *     tags: [Contatos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUsuario:
 *                 type: integer
 *               numeroTelefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contato criado com sucesso
 */
router.post("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.create);

/**
 * @swagger
 * /api/v1/contatos/{id}:
 *   put:
 *     summary: Atualiza um contato existente
 *     tags: [Contatos]
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
 *               numeroTelefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contato atualizado com sucesso
 *       404:
 *         description: Contato não encontrado
 */
router.put("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.update);

/**
 * @swagger
 * /api/v1/contatos/{id}:
 *   delete:
 *     summary: Remove um contato
 *     tags: [Contatos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Contato removido com sucesso
 *       404:
 *         description: Contato não encontrado
 */
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), controller.remove);

module.exports = router;