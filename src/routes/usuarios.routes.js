const express = require("express");
const controller = require("../controllers/usuarios.controller");
const { authenticateToken } = require("../middlewares/authenticateToken.middleware");
const { authorizeRoles } = require("../middlewares/authorizeRoles.middleware");
const router = express.Router();
// LIVRES
router.get("/", controller.list);
router.get("/:id", controller.getById);
router.post("/", controller.create);
// PROTEGIDAS
//router.post("/", authenticateToken, authorizeRoles(["user", "admin"]), controller.create);
router.put("/:id", authenticateToken, authorizeRoles(["user", "admin"]), controller.update);
router.delete("/:id", authenticateToken, authorizeRoles(["admin"]), controller.remove);

module.exports = router;