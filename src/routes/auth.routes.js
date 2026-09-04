const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findByUsername } = require("../data/login.data"); //sai da pasta routes, vai para pasta data e acessa o arquivo login.data

const router = express.Router();

//ve se usuario e senha estão preenchidos para devolver mensagem de erro
router.post("/login", (req, res) => {
    const {username, password} = req.body;

    //validar se preencheu username e password
    if(!username || !password)
        return res.status(400).json({message: "Informe username e password"});

    //vai receber toda a informação do username que está no login.data
    const user = findByUsername(username);
    if(!user)     //verifica se o usuário existe
        return res.status(401).json({message: "Credenciais inválidas."});
    
    const ok = bcrypt.compareSync(password, user.passwordHash);   //se o usuário existir, vai comparar os hashs para retornar true or false
    if(!ok)
        return res.status(401).json({message: "Credenciais inválidas."});

    // FIM DAS VALIDAÇÕES (username e senha)
    // token que vai ser devolvido para o usuário
    const payload = {
        sub: String(user.id),     //id do usuário como string (convertido)
        username: user.username,
        role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    //devolvendo para o usuário
    return res.json({
        tokenType: "Bearer",
        accessToken: token,
        expiresIn: process.env.JWT_EXPIRES_IN
    });
});

module.exports = router;