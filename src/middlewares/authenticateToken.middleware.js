// Vai autenticar o token, verificar se é válido. 
// Para isso precisará ser decoficicado com a biblioteca jsonwebtoken
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next){
    //vamos precisar pegar o token que está no cabeçalho da requisição (headers)
    const authHeader = req.headers.authorization;

    if(!authHeader) //se o token é ausente ele não está autenticado
        return res.status(401).json({message: "Token ausente."});
    
    //o separador(split) é só colocar um espaço entre aspas
    const [type, token] = authHeader.split(" "); //type:bearer e token:código

    //verifica se o token atende a regra, se o tipo é igual a bearear e se a variável token veio preenchida
    if(type !== "Bearer" || !token)
        return res.status(401).json({message: "Formato de Token inválido."});

    //se der erro está inválido ou expirado, aqui vamos decodificar o token
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // vai tentar decodificar usando o jwt secret
        req.user = decoded; //vai ser lido dentro do outro middleware que criamos 
        return next();
    } catch (err){
        return res.status(401).json({message: "Token inválido ou expirado."});
    }

}

module.exports = { authenticateToken }