// vai receber as regras permitidas pra cada rota e definir quem pode acessar o que
function authorizeRoles(...allowedRoles){ //lembrando que toda function é um método
    return (req, res, next) => { //next significa que passou pelo middleware e vai seguir/próximo
        if(!req.user || !req.user.role) //se não tenho usuário ou não tenho regra
            return res.status(401).json({message: "Não autenticado."});
        if(!allowedRoles.includes(req.user.role)){ // tradução: se as roles permitidas não incluem a role do usuário
            return res.status(403).json({message: "Sem permissão."});
        }

        //foi autenticado e autorizado? então next
        return next();
    }
}

module.exports = { authorizeRoles }