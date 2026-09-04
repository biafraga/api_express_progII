const bcrypt = require("bcryptjs");

const users = [
    {
        id:1,
        username: "vitor",
        role: "user",
        passwordHash: bcrypt.hashSync("123", 10)
    },
    {
        id:2,
        username: "admin",
        role: "admin",
        passwordHash: bcrypt.hashSync("123", 10) //se chama quando cria o usuário no banco de dados, mas ainda não estamos trabalhando com banco de dados. 
    }
];

//método para localizar o usuário pelo username
// vai pegar a lista users e vai procurar o username solicitado
function findByUsername(username){
    return users.find((u) => u.username === username);
}

module.exports = {
    findByUsername,
};